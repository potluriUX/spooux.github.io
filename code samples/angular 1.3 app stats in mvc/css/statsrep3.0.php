<?php
    $GLOBALS['PHP_SELF'] = $_SERVER['PHP_SELF'];

    $GLOBALS['DEBUG'] = false;

    if ($GLOBALS['DEBUG']) {
        echo "<!-- " . time() . " - index.php start -->\n";
    }

    # 6/21/2007: R.E. Dye - Trying to make it easier to add additional non-GO databases,
    # like BookFLIX and iKnow
    # 6/28/2007: R.E. Dye - IMPORTANT! the following line needs to be added to the
    # /data/stats3/remote/utils/autostats/autostatsreport.php application as well!
    $GLOBALS['NGPCODES'] = array('bkflix', 'xs', 'sji' );

    # 12/2/2008: R.E. Dye - Filter out some codes which are in the auth.product table
    # (needed by auth to sort Global pref codes) which should not be selectable in the reports
    # or included in the counts (should all be zero, anyway)
    # IMPORTANT! needs to be added to the autostatsreport app as well!
    $GLOBALS['NPPCODES'] = array('bkflixg', 'read', 'ra', 'r180s');

    $indinsts = array();
    $aggregates = array();
    $pcodes = array();

    # This will be a list of recipient ids for the customer and all of its children
    # in a form which can be inserted into a mysql query 'in' clause.
    $childString = '()';

    if (isset($_REQUEST['reporttype'])) {
        $reporttype = $_REQUEST['reporttype'];
    } else {
        $reporttype = "";
    }

    # what output format is desired?
    # Unless we're outputting a final report in Excel format, it should
    # be HTML.
    if (isset($_REQUEST['outformat'])) {
        # if we're not ready to actually output a final report yet, then we're still 'html'.
        if (isset($_REQUEST['runindinst_x']) || isset($_REQUEST['runaggregate_x']) || $reporttype == 'summary' || $reporttype == 'skipchildren') {
            $outputformat = $_REQUEST['outformat'];
        } else {
            $outputformat = 'html';
        }
    } else {
        $outputformat = 'html';
    }


    if ($outputformat == 'xl') {
        include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/ExcelFormatter.php");
        $myFormatter = new ExcelFormatter();
    } else {
        include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/HTMLFormatter.php");
        $myFormatter = new HTMLFormatter();
    }

    $myFormatter->outputHeaders();

    if (isset($_REQUEST['customerid'])) {
        $CUID = $_REQUEST['customerid'];
    } else {
        if (isset($_REQUEST['adminid']) && isset($_REQUEST['adminp'])) {
            # attempt to lookup customer id.
            $result = lookupCUID($_REQUEST['adminid'], $_REQUEST['adminp']);
            if ($result <> "") {
                $CUID = $result;
            } else {
                promptForPassword('bad');
            }
        } else {
            promptForPassword();
        }

    }

    if (isset($CUID)) {
        parsePostData();

        # Construct the childString for this recipient ID
        $childString = createChildString($CUID);

        if ($outputformat == 'html') {
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/ControlPanel.php");
            $myControlPanel = new ControlPanel($CUID, $myFormatter, $childString, $pcodes);
            $myControlPanel->output();
        }


        # tweak the products
        if (isset($_REQUEST['showsearch'])) {
            $pcodes['srch'] = 'on';
            $pcodes['z3950'] = 'on';
        } else {
            unset($pcodes['srch']);
            unset($pcodes['z3950']);
        }

        if (isset($_REQUEST['showgo'])) {
            $pcodes['go'] = 'on';
        } else {
            unset($pcodes['go']);
        }


        # 6/21/2007: R.E. Dye - Modifying this to use the global NGPCODES array
        foreach ($GLOBALS['NGPCODES'] as $ngpcode) {
            if (isset($_REQUEST['show'.$ngpcode])) {
                $pcodes[$ngpcode] = 'on';
            }
            else {
                unset($pcodes[$ngpcode]);
            }
        }

        if (isset($_REQUEST['runindinst_x'])) {
            # Here's where we do the indinst reports.
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/IndinstReport.php");
            foreach ($indinsts as $instid) {
                # HEY! This is the one what needs fixin'!
                $myReport = new IndinstReport($instid, $_REQUEST['startdate'], $_REQUEST['enddate'], $pcodes, createChildString($instid));
                $myFormatter->output($myReport, $myReport->getName());
            }
        } elseif (isset($_REQUEST['runaggregate_x'])) {
            # Here's where we do the 'group code' reports
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/AggregateReport.php");
            foreach ($aggregates as $aggcode) {
                $myReport = new AggregateReport($aggcode, $CUID, $_REQUEST['startdate'], $_REQUEST['enddate'], $pcodes, $childString);
                $myFormatter->output($myReport, $aggcode);
            }
        } elseif ($reporttype == 'sites') {
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/IndinstList.php");
            $myCheckboxList = new IndinstList($CUID, "Individual Sites", "indinst");
            $myCheckboxList->output();
        } elseif ($reporttype == 'groups') {
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/AggcodeList.php");
            $myCheckboxList = new AggcodeList($CUID, "User Groups", "aggregate");
            $myCheckboxList->output();
        } elseif ($reporttype == 'summary' || $reporttype == 'skipchildren') {
            include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep3.0/SummaryReport.php");
            if ($reporttype == 'skipchildren') {
                $skipkidsflag = true;
            } else {
                $skipkidsflag = false;
            }

            #print "<p>\$childString = " . $childString . "</p>\n";
            $myReport = new SummaryReport($CUID, $_REQUEST['startdate'], $_REQUEST['enddate'], $skipkidsflag, $pcodes, $childString);
            $myFormatter->output($myReport, $myReport->getName());
        }

        if ($outputformat == 'html') {
            # Here's where we could add additional text.
            # Whoops! No it ain't.  The design was changed to require maximum
            # work for minimum result.
            include($_SERVER['INCLUDE_HOME']."/html/copyright.html");
        }
    }

    $myFormatter->outputFooters();

    if ($GLOBALS['DEBUG']) {
        echo "<!-- " . time() . " - index.php end -->\n";
    }

    /**
    * Output the username and password prompt
    *
    * @access   public
    */
    function promptForPassword($badFlag="good"){
        # prompt for username and password.
        print "<body>\n";

        print '<table class="iwhite" border="0" cellpadding="0" cellspacing="5" width="100%">'."\n";
        print '<tr><td class="iwhitemiddle" colspan="2"><img src="/images/Scholastic_logo.gif" alt="" width="175" height="21" border="0"></td></tr>'."\n";
        

        print '<tr><td class="iwhitemiddle" colspan="2">'."\n";
        print '<table class="iwhite" border="0" cellpadding="0" cellspacing="5" width="100%">'."\n";
        print '<tr><td width="50"></td>';
        print '<td class="iwhitemiddle">' . "\n";
        
        # Feb-Mar 2008 error message
        #print '<p><b>An important notice about Grolier Online statistics for February and March 2008.</b></p>' . "\n"; 
        #print "<p>Due to a delay in the reporting mechanism for some of our servers, Grolier Online statistics were under-reported for February 2008. ";
        #print "All statistics were ultimately reported, but were unfortunately not included until the March 2008 report. We therefore recommend that ";
        #print "when comparing year-over-year reports for February and March that the 2 months be added together and compared in that fashion. ";
        #print "We apologize for any inconvenience that this may cause.</p>\n";

        #print "<p><b>An important notice about Scholastic online product usage statistics for February and March 2008.</b></p>\n";
        #print "<p>Due to a delay in our reporting program, usage statistics for Scholastic online products (Grolier Online and Scholastic BookFlix) ";
        #print "were under-reported for February 2008. All statistics were ultimately reported, but a portion of February statistics were not ";
        #print "included until the March 2008 report. We therefore recommend that when comparing year-over-year reports for February and March ";
        #print "that the two months be added together. We apologize for any inconvenience that this may cause.</p>\n";

        # December catch-up
        #print "<p><b><u><font color=\"#CF0000\">An important notice about Scholastic online product usage statistics for December 2008.</font></u></b></p>\n";

        #print "<p>Due to an important system upgrade, usage statistics for Scholastic online products (Grolier Online and Scholastic BookFlix) ";
        #print "will be collected for December, and month-to-date reports will be available before <b>December 19th</b>. Again, this impacts ";
        #print "month-to-date statistics reports for December only. No other reports will be affected. We apologize for any inconvenience ";
        #print "that this may cause. Please contact Scholastic Customer Service at 888-326-6546 if you have any questions.</p>\n";
        # end of error messages.


        # asrch underreporting error message
        print '<p><b>An important notice about Grolier Online statistics for November and December 2008, and for January 2009.</b></p>' ."\n"; 
        print "<p>Due to a glitch in our statistics reporting mechanism, search statistics for Grolier Online have been under-reported for these three months. ";
        print "All statistics were collected during this time, and the reports have now been updated to reflect the correct data. We therefore recommend that ";
        print "you rerun reports for these three months. </p>\n";
        print '<p>Also, if you currently receive automated email reports, we will be rerunning, and resending these, to you.</p>'."\n";

        print "We apologize for any inconvenience that this may cause.</p>\n";




        print "</td>";
        print '<td width="50"></td></tr>';
        print "</table>\n";
        print "</td></tr>\n";


        print '<tr><td valign="center"><h2>Usage Report for Scholastic Online products</h2></td><td></td></tr>'."\n";


        print '<form action="'.$GLOBALS['PHP_SELF'].'" method="post">'."\n";

        if ($badFlag == 'good') {
            print '<tr><td colspan="2"><p class="ienter">Please enter your administration user ID and password</p></td></tr>'."\n";
        } else {
            print '<tr><td colspan="2"><p class="iincorrect"><i>Login failed: Please check your User ID and Password and try again.</i></p></td></tr>'."\n";
        }

        print '<tr><td width="45%" align="right">User ID: </td><td><input type="text" name="adminid" size="20" maxlength="20" /></td></tr>'."\n";
        print '<td width="45%" align="right">Password: </td><td><input type="text" name="adminp" size="20" maxlength="20" /></td></tr>'."\n";
        print '<tr><td colspan="2" align="center"><div class="iright"><input type="image" src="/images/continue.png" name="continue">&nbsp; &nbsp; &nbsp;</div></td></tr>'."\n";
        print "</form>";
        
        #print '<tr><td class="iwhite" colspan="2"><p class="bigred">October 2007 statistics were not finalized until November 5th due to a system issue with one of our reporting servers.<br />All statistics have now been posted and finalized. We apologize for any inconvenience that this may have caused. </p></td></tr>' . "\n";
        
        print '<tr><td class="iwhite" colspan="2"><p class="icpyrght">Copyright &copy; ' . date('Y') . ' Scholastic, Inc. All rights reserved.</p>'."\n";
        print "</table>\n";
    }

    function lookupCUID($inID, $inPW){
        include_once('DB.php');

        $outResult = "";

        $db = DB::connect($_SERVER['AUTH_CONNECT_STRING']);
        if (!PEAR::isError($db)) {
            $qString = "select customer_id from customer where admin_id='$inID' and admin_pass='$inPW'";
            #echo "<!-- \$qString = $qString -->\n";
            $result = $db->getOne($qString);
            if (!PEAR::isError($result)) {
                $outResult = $result;
            }
            $db->disconnect();
        }
        return $outResult;
    }


    # This is required because the $_POST and $_REQUEST superglobal arrays
    # cannot handle multiple values with the same key.
    # 6/21/2007: R.E. Dye - Actually... they can, but I didn't know how to
    # do it when I first wrote this.  But since it ain't broke, I ain't
    # gonna fix it.
    function parsePostData(){
        global $aggregates, $indinsts, $pcodes;
        $pairs = explode('&', file_get_contents('php://input'));
        foreach($pairs as $pair) {
            $keyvalue = explode('=', $pair);
            if ($keyvalue[0] == "aggregate") {
                $aggregates[] = $keyvalue[1];
            } elseif ($keyvalue[0] == "indinst") {
                $indinsts[] = $keyvalue[1];
            } elseif ($keyvalue[0] == "pcode") {
                $pcodes[$keyvalue[1]] = 'on';
            }
        }
    }


    # Insert the recipient id ($pid) into the passed childArray, then recurse all its children.
    function recurseChildren($db, $pid, &$childArray){

        if (!in_array($pid, $childArray)) {
            array_push($childArray, $pid);
        }

        $qString = "select distinct cid CID from customer_tree where pid = '" . $pid . "'";
        $dataSet =& $db->query($qString);
        if (!PEAR::isError($dataSet)) {
            while ($dbrow =& $dataSet->fetchRow(DB_FETCHMODE_ASSOC)) {
                $cid = $dbrow['CID'];
                if (!in_array($cid, $childArray)) {
                    recurseChildren($db, $cid, $childArray);
                }
                
            }
            $dataSet->free();
        } else {
            print "<p>recurseChildren query failed.</p>\n";
        }
    }


    # This function takes a recipient ID and returns a string of
    # this ID and all of its descendants in the form:
    # "('nnnnn','xxxxx','yyyyy'....)".
    function createChildString($inID){
        if ($GLOBALS['DEBUG']) {
            echo "<!-- " . time() . " - createChildString($inID) start -->\n";
        }

        $outString ="()";

        $db = DB::connect($_SERVER['STATS_CONNECT_STRING']);
        if (!PEAR::isError($db)) {
            $childArray = array();
            recurseChildren($db, $inID, $childArray);

            $outString = "";
            foreach($childArray as $cid) {
                if ($outString != "") {
                    $outString .= ",";
                }
                $outString .= "'" . $cid . "'";
            }
            $outString = "(" . $outString . ")";
        }
        else {
            print "<p>Unable to connect to the stats database.</p>\n";
            #print "<p>" . $_SERVER['STATS_CONNECT_STRING'] . "</p>\n";
        }

        if ($GLOBALS['DEBUG']) {
            echo "<!-- " . time() . " - createChildString($inID) end -->\n";
        }

        return $outString;
    }

?>
