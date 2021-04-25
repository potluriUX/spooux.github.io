<?php
    require_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep5.0/Returns.php");

    // Default return
    $returnObject = new ServerErrorReturn('Server is currently inoperative: under development');

    $GETPOST = array_merge($_GET, $_POST);

    if (array_key_exists('request', $GETPOST)) {
        switch($GETPOST['request']) {
            case "getCustomerInfo":
                include_once($_SERVER["PHP_INCLUDE_HOME"]."stats3/common/statsrep5.0/CustomerInfoReturn.php");
                $returnObject = new CustomerInfoReturn($GETPOST);
                break;
            default:
                $returnObject = new ClientErrorReturn("Unknown request '{$GETPOST['request']}' specified.");
        }
    }
    else {
        $returnObject = new ClientErrorReturn("No 'request' parameter specified.");
    }

    header("Content-type: application/json");
    echo json_encode($returnObject->getReturnData());

?>
