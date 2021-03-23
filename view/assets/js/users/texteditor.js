define(function (require, exports, module) {
	 require("../../../../ckeditor4/ckeditor");
	 exports.displayTextEditor =(value)=>{ 
		
		const editor = CKEDITOR.replace( 'description' );
		console.log(CKEDITOR)
		const body = document.getElementById("body");
		const textarea = document.getElementById('textarea');
		const div = document.getElementById('textarea-div');
		//console.log(textarea)
		textarea.oninput = "return returnValidation(this.value, this.name)"
		if (value === undefined) {
			textarea.value = "";
		}else{
		textarea.value = value;
			
		}
		 div.appendChild(textarea);
		 
		 editor.on( 'change', function( evt ) {

		returnValidation(evt.editor.getData(), "description");
		  for (instance in CKEDITOR.instances) {
		  	//console.log(instance)
            CKEDITOR.instances[instance].updateElement();
    	}
	
});

	}
	 
});