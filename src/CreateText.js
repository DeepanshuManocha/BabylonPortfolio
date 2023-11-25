import * as BABYLON from '@babylonjs/core';

export function CreateText(scene, _fontName, _type, _planeHeight, _text, _textColor, _bgColor, _position) {
    //Set font
    var font_size = 48;
    var font = _type + font_size + "px " + _fontName;

    //Set height for plane
    var planeHeight = _planeHeight;

    //Set height for dynamic texture
    var DTHeight = 1.5 * font_size; //or set as wished

    //Calcultae ratio
    var ratio = planeHeight / DTHeight;

    //Set text
    var text = _text;

    //Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
    var temp = new BABYLON.DynamicTexture("DynamicTexture", 64, scene);
    var tmpctx = temp.getContext();
    tmpctx.font = font;
    var DTWidth = tmpctx.measureText(text).width + 8;

    //Calculate width the plane has to be 
    var planeWidth = DTWidth * ratio;

    //Create dynamic texture and write the text
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", { width: DTWidth, height: DTHeight }, scene, false);
    var mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseTexture = dynamicTexture;
    dynamicTexture.drawText(text, null, null, font, _textColor, _bgColor, true);

    //Create plane and set dynamic texture as material
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: planeWidth, height: planeHeight }, scene);
    plane.material = mat;
    plane.position = _position;
    return plane;
}