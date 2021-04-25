<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal(info)'></div>
    <div class='ng-modal-dialog' ng-style='dialogStyle'>
       <!-- {{loading_image_show}}<!--left side varibale in controller. wont work-->
      <!-- {{info2}} <!--left side var in directive. passed from controller-->
     <!-- {{changednameofinfo}}-->
      This is transclude directive with width and height.
        <div ng-if="!info" class='ng-modal-close'  ng-click='hideModal()'>X</div>
        <div class='ng-modal-dialog-content' ng-transclude></div>
            <!--{{rpt.rpt_type}}-->
            <!--passed data from controller in above line-->
    </div></div>