(function(jQuery){var oldManip=jQuery.fn.domManip,htmlExpr=/^[^<]*(<[\w\W]+>)[^>]*$/;jQuery.fn.extend({render:function(data,options){return this.map(function(i,tmpl){return jQuery.render(tmpl,data,options)})},domManip:function(args){if(args.length>1&&args[0].nodeType){arguments[0]=[jQuery.makeArray(args)]}if(args.length>=2&&typeof args[0]==="string"&&typeof args[1]!=="string"){arguments[0]=[jQuery.render(args[0],args[1],args[2])]}return oldManip.apply(this,arguments)}});jQuery.extend({render:function(tmpl,data,options){var fn,node;if(typeof tmpl==="string"){fn=jQuery.templates[tmpl];if(!fn&&!htmlExpr.test(tmpl)){node=jQuery(tmpl).get(0)}else{fn=jQuery.tmpl(tmpl)}}else if(tmpl instanceof jQuery){node=tmpl.get(0)}else if(tmpl.nodeType){node=tmpl}if(!fn&&node){var elemData=jQuery.data(node);fn=elemData.tmpl||(elemData.tmpl=jQuery.tmpl(node.innerHTML))}var context={data:data,index:0,dataItem:data,options:options||{}};if(jQuery.isArray(data)){return jQuery.map(data,function(data,i){context.index=i;context.dataItem=data;return fn.call(data,jQuery,context)})}else{return fn.call(data,jQuery,context)}},templates:{},tmplcmd:{"each":{_default:[null,"$i"],prefix:"jQuery.each($1,function($2){with(this){",suffix:"}});"},"if":{prefix:"if($1){",suffix:"}"},"else":{prefix:"}else{"},"html":{prefix:"_.push(typeof ($1)==='function'?($1).call(this):$1);"},"=":{_default:["this"],prefix:"_.push($.encode(typeof ($1)==='function'?($1).call(this):$1));"}},encode:function(text){return text!=null?document.createTextNode(text.toString()).nodeValue:""},tmpl:function(str,data,i,options){var fn=new Function("jQuery","$context","var $=jQuery,$data=$context.dataItem,$i=$context.index,_=[];_.data=$data;_.index=$i;"+"with($data){_.push('"+str.replace(/[\r\t\n]/g," ").replace(/\${([^}]*)}/g,"{{= $1}}").replace(/{{(\/?)(\w+|.)(?:\((.*?)\))?(?: (.*?))?}}/g,function(all,slash,type,fnargs,args){var tmpl=jQuery.tmplcmd[type];if(!tmpl){throw"Template not found: "+type}var def=tmpl._default;return"');"+tmpl[slash?"suffix":"prefix"].split("$1").join(args||(def?def[0]:"")).split("$2").join(fnargs||(def?def[1]:""))+"_.push('"})+"');};return $(_.join('')).get();");return data?fn.call(this,jQuery,{data:null,dataItem:data,index:i,options:options}):fn}})})(jQuery);