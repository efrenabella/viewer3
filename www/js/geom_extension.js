/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

AutodeskNamespace('Autodesk.ADN.Viewing.Extension.MyExtension');

Autodesk.ADN.Viewing.Extension.MyExtension = function (viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _self = this;

  ///////////////////////////////////////////////////////////////////////////
  // load callback
  ///////////////////////////////////////////////////////////////////////////
  _self.load = function () {

    // need to access geometry? wait until is loaded
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function(){
      // ToDo: viewer geometry is ready
       GeometryRetrieve();
    });

    console.log('MyExtension loaded');
    return true;
  };

  function GeometryRetrieve(){
      //console.log(model);
			//console.log(viewer);
	var id = _model.getModelId();
	console.log(id);
	viewer.getProperties(id,onGetPropertiesSuccess,onGetPropertiesError);
	viewer.getObjectTree(onObjTreeSuccess,onObjTreeError);
	var frags = _model.getFragmentList();
	console.log(frags);
      	var geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(lvmDoc.getRootItem(), {
        'type': 'geometry',
      	}, true);
	console.log(geometryItems);
	var objCol = [];
	geometryItems.forEach((item)=>{
		objCol.push(lvmDoc.getViewablePath(item));
	});
	console.log(objCol);
  }
function OnGetProperties_ofOne_Success(props){
	//if(props.name.contains("Cracks") ) {
		//console.log(props.name);
	//}
	var props2 = Object.values(props);
	for(var j = 0; j < props2.length; j++){
		var name1 = props2[j];//console.log(name1);
		//if(name.contains("Cracks")){
		//	console.log(props2);
		//}
		var props3 = Object.values(props2);
		//console.log(props3);
		var props4 = Object.values(props3);
		var name2 = props4[3];
		//console.log(props4);
		//console.log(props4[1]);
		//console.log(props4[2]);
		//console.log(name2);

		if(name2.contains("Crack")){
			console.log(props4);
			props4.forEach(function(x) {
			console.log(x);	
		});
		}
		//for(var k = 0;k < props4.length;k++){
		//	console.log(props4[k]);	
		//}
	}
}
function OnGetProperties_ofOne_Error(err){
	console.error('OnGetProperties_ofOne_Error() - errorCode:' + err);
}
function onObjTreeError(objTreeError){
	console.error('onObjTreeError() - errorCode:' + objTreeError);
}
function ongetBulkPropertiesSuccess(bProps){
	console.log(bProps);
}
function ongetBulkPropertiesError(err){
	console.error('ongetBulkPropertiesError() - errorCode:' + err);
}

function onGetPropertiesSuccess(props){
	console.log(props); 
}
function onGetPropertiesError(objTreeError){
	console.error('onGetPropertiesError() - errorCode:' + onGetPropertiesError);
}
function onObjTreeSuccess(dat){
	console.log(dat);
	var childrn = dat.nodeAccess.children;
	//console.log(childrn);
	var ids = dat.nodeAccess.dbIdToIndex;

	viewer.getProperties(ids[2],OnGetProperties_ofOne_Success,OnGetProperties_ofOne_Error);
	var queue = Object.values(ids);
	console.log(queue);
	for (var n = 0; n < queue.length; n++){
		//console.log(queue[n]);
		viewer.getProperties(queue[n],OnGetProperties_ofOne_Success,OnGetProperties_ofOne_Error);
	}
}
  
  ///////////////////////////////////////////////////////////////////////////
  // unload callback
  ///////////////////////////////////////////////////////////////////////////
  _self.unload = function () {
    // ToDo: prepare to unload the extension

    console.log('MyExtension unloaded');
    return true;
  };
};

Autodesk.ADN.Viewing.Extension.MyExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.MyExtension.prototype.constructor = Autodesk.ADN.Viewing.Extension.MyExtension;

Autodesk.Viewing.theExtensionManager.registerExtension('Autodesk.ADN.Viewing.Extension.MyExtension', Autodesk.ADN.Viewing.Extension.MyExtension);

// How to load?
// see ./viewer.js:loadDocument
