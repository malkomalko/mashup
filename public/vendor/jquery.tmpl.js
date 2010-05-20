(function(e){var c=e.fn.domManip,b=("console" in window)?window.console:{log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){}};e.fn.extend({render:function(f){return this.map(function(h,g){return e(e("<div>"+e.render(g,f)+"</div>")[0].childNodes).get()})},domManip:function(f){if(f.length>1&&f[0].nodeType){arguments[0]=[e.makeArray(f)]}if(f.length===2&&typeof f[0]==="string"&&typeof f[1]!=="string"){arguments[0]=[e(e("<div>"+e.render(f[0],f[1])+"</div>")[0].childNodes).get()]}return c.apply(this,arguments)}});e.extend({render:function(h,m,g){var j,l;if(e.templates[h]){j=e.templates[h]}else{if(h.nodeType){var k=h,f=e.data(k)||{};if(k.src){return e.render({async:false,url:k.src,templateData:m})}else{j=f.tmpl||e.tmpl(k.innerHTML)}}else{if(e.isPlainObject(h)){var i=e.extend({},h,{type:"GET",dataType:"text",success:function(n){e.templates[h.url]=e.tmpl(n);if(h.success){h.success(e.render(h.url,h.templateData))}},error:function(p,n,o){e.templates[h.url]=e.tmpl("Failed to load template from "+h.url+"("+n+")"+o);if(h.error){h.error(e.render(h.url,h.templateData))}}});l=e.ajax(i);return(h.async===false)&&!h.success?e.render(h.url,h.templateData):l}}}j=j||e.tmpl(h);if(e.isArray(m)){return e.map(m,function(o,n){return j.call(o,e,o,n)})}else{return j.call(m,e,m,0)}},templates:{},encode:function(f){return f!=null?document.createTextNode(f.toString()).nodeValue:""},tmpl:function(l,j,g){if(!(d&&a)){d=new RegExp(e.tmpl.startTag+"\\s*(\\/?)(\\w+|.)(?:\\((.*?)\\))?(?: (.*?))?\\s*"+e.tmpl.endTag,"g");a=new RegExp(e.tmpl.startExpression+"([^"+e.tmpl.endExpression+"]*)"+e.tmpl.endExpression,"g");e.tmpl.startTag=e.tmpl.startTag.replace("\\","","g");e.tmpl.endTag=e.tmpl.endTag.replace("\\","","g")}var h,f="\nvar $ = jQuery, \n    T = [], \n    _ = $.tmpl.filters; \n\n//make data available on tmpl.filters as object not part of global scope \n_.data = T.data = $data; \n_.$i = T.index = $i||0; \nT._ = null; //can be used for tmp variables\nfunction pushT(value, _this, encode){\n    return encode === false ? \n        T.push(typeof value ==='function'?value.call(_this):value) : \n        T.push($.encode(typeof( value )==='function'?value.call(_this):value));\n}\n\n// Introduce the data as local variables using with(){} \nwith($.extend(true, {}, _, $data)){\ntry{\n    T.push('"+l.replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(a,e.tmpl.startTag+"= $1"+e.tmpl.endTag).replace(d,function(r,p,q,n,o){var m=e.tmpl.tags[q];if(!m){throw"Template not found: "+q}var s=m._default||[];var i="');"+m[p?"suffix":"prefix"].split("$1").join(o||s[0]).split("$2").join(n||s[1])+"\n        T.push('";return i})+"');\n}catch(e){\n    if($.tmpl.debug){\n        T.push(' '+e+' ');\n    }else{\n        T.push('');\n    }\n}//end try/catch\n}\n//reset the tmpl.filter data object \n_.data = null;\nreturn T.join('')";if(e.tmpl.debug){b.log("Generated Function: \n",f)}try{h=new Function("jQuery","$data","$i",f)}catch(k){b.warn(f);throw (k)}return j?h.call(this,e,j,g):h}});e.extend(e.tmpl,{debug:false,startTag:"{{",endTag:"}}",startExpression:"\\${",endExpression:"}"});var d,a;e.tmpl.filters={join:function(){return Array.prototype.join.call(arguments[0],arguments[1])}};e.tmpl.tags={comment:{prefix:"\n    /*",suffix:"\n    */"},each:{_default:[null,"$i"],prefix:"\n        jQuery.each( $1, function($2){\n            with(this){",suffix:"\n            }\n        });"},"if":{prefix:"\n        if( $1 ){",suffix:"\n        }"},elseif:{prefix:"\n        }else if( $1 ){"},"else":{prefix:"\n        }else{"},html:{prefix:"\n        pushT($1, this, false);"},ignore:{prefix:"",suffix:""},"=":{_default:["this"],prefix:"\n        pushT($1, this);"}}})(jQuery);