/*
copyright:
[jlite.0.0.5]
[http://www.qq.ee]
[https://github.com/qqee/jlite]
*/
+function(win){
	var D=document;
	var jlite=(function(){
		var e=function(v){return e.prototype.f(v)};
		return e.prototype.f=function(f,o){
			var t=typeof f;
			if("function"==t){
				if(D.addEventListener){
					D.addEventListener("DOMContentLoaded",function(){
						D.removeEventListener("DOMContentLoaded",arguments.callee,!1);
						f()
					},!1);
				}else if(D.attachEvent){
					D.attachEvent("onreadystatechange",function(){
						if(D.readyState==="complete"){
							D.detachEvent("onreadystatechange",arguments.callee);
							f()
						}
					});
				}
			}else if("string"==t){
				var _=f.substr(0,1);
				var z=f.substr(1);
				var n=z.length;
				if(_=="#"){
					var o=D.getElementById(z);
					jlite._b(o);
					return o;
				}else{
					if(!o)o=D.body;
					var all=o.getElementsByTagName((_==".")?("*"):(f)),arr=[];
					for(var i=0;i<all.length;i++){
						if(_!="."){
							jlite._b(all[i]);
							arr.push(all[i]);
						}else{
							var c=all[i].className;
							if(c.length>=n){
								var m=c.indexOf(z);
								if(m>=0){
									var g=c.split(" ");
									for(var v in g){
										if(g[v]==z){
											jlite._b(all[i]);
											arr.push(all[i]);
										}
									}
								}
							}
						}
					}
					arr.each=function(f){
						for(var i=0;i<this.length;i++)f(i,this[i]);
					}
					jlite._b(arr,1);
					return arr;
				}
				
			}
		}
	})();
	jlite.ie=!-[1,];
	jlite.https='https:'==D.location.protocol;
	//sub function return 1 to break loop.
	jlite.each=function(o,f){
		if("object"!=typeof(o))return;
		if(o.length){
			for(var i=0;i<o.length;i++){
				if(1==f(i,o[i]))break;
			}
			return;
		}
		for(var v in o){
			if(1==f(v,o[v]))break;
		}
	}
	jlite.isnumber=function(s){
		if(s)return !isNaN(s);
		return false;
	}
	jlite.len=function(o){
		if(!o)return 0;
		var n=0;
		for(var v in o)n++;
		return n;
	}
	jlite.eu=function(str){
		var a=[];
		var pcs="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		for(var i=0;i<str.length;i++){
			if(pcs.indexOf(str.substr(i,1))==-1)
				a[i]="\\u"+("0000"+str.charCodeAt(i).toString(16)).slice(-4);
			else a[i]=str.substr(i,1);
		}
		return a.join("");
	}
	jlite.json=function(o){
		var _=typeof(o);
		if(_=="string"){
			var r;
			try{
				r=(new Function("return "+o))();
			}catch(e){}
			return r;
		}else if(_=="object"){
			var ff=function(p){
				var arr=[];
				for(var v in p){
					var t=typeof(p[v]);
					var s='"'+jlite.eu(v)+'":';
					if(t=="object"){
						s+=ff(p[v]);
					}else{
						if(t=="string")
							s+='"'+jlite.eu(p[v])+'"';
						else if(t=='number')
							s+=p[v];
					}
					arr.push(s);
				}
				return "{"+arr.join(",")+"}";
			}
			return ff(o);
		}
	}
	jlite.get=function(k,v){
		var r=v;
		var where=D.location.href.indexOf(k+"=");
		if(where>0){
			r=D.location.href.substr(where+k.length+1);
			where=r.indexOf("&");
			if(where>0)r=r.substr(0,where);
		}
		return decodeURIComponent(r);
	}
	jlite._s=function(us){
		return(us?(new Date().getTime()):(parseInt((new Date().getTime())/1000)));
	}
	jlite.ms=function(){
		return jlite._s();
	}
	jlite.us=function(){
		return jlite._s(1);
	}
	jlite.now=function(unix){
		unix||(unix=jlite.ms());
		var date=new Date(unix*1000);
		var s=date.getFullYear()+'-';
		s+=(date.getMonth()+1<10?('0'+(date.getMonth()+1)):date.getMonth()+1)+'-';
		s+=(date.getDate()<10?('0'+date.getDate()):date.getDate())+' ';
		s+=(date.getHours()<10?('0'+date.getHours()):date.getHours())+':';
		s+=(date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes())+':';
		s+=(date.getSeconds()<10?('0'+date.getSeconds()):date.getSeconds());
		return s;
	}
	//$.cookie() //get all cookies
	//$.cookie("k") //get "k" cookie value
	//$.cookie("www.qq.ee",$.now()); //set cookie use default config:[7 days, /]
	//$.cookie("www.qq.ee",$.now(),{"expires":300,"path":"/","secure":1}); //set cookies
	//$.cookie("") //delete all cookie
	//$.cookie("k","") //delete "k" cookie
	jlite.cookie=function(k,v,r){
		var setcookie=function(key,val,day,path,secure){
			var str=";expires="+new Date(+new Date()+day*864e5).toGMTString();
			if(secure=="undefined"){
				str+=jlite.https?";secure":"";
			}else{
				str+=secure?";secure":"";
			}
			str+=path?(";path:"+path):"";
			D.cookie=key+"="+val+str;
		}
		if(k==""){
			var y=D.cookie.match(/[^ =;]+(?=\=)/g);
			if(y)for(var i=y.length;i--;)setcookie(y[i],"",-1)
			return;
		}
		if(k){
			if(v==""){
				setcookie(k,"",-1);
				return;
			}
			if(v){
				setcookie(k,v,(r&&r.expires?r.expires:7),(r&&r.path?r.path:0),(r&&r.secure?r.secure:0));
			}else{
				var o=(new RegExp("(^| )"+k+"=([^;]*)(;|$)")).exec(D.cookie);
				return(o?o[2]:"");
			}
		}
		return D.cookie;
	}
	jlite.ajax=function(c){
		if(!c.url)return false;
		var r=(window.XMLHttpRequest)?(new XMLHttpRequest()):(new ActiveXObject("Microsoft.XMLHTTP"));
		r.open((c.type||"GET"),c.url,((c.async==undefined)?(true):(c.async?true:false)));
		jlite.each(c.headers,function(k,v){
			r.setRequestHeader(k,v);
		});
		r.onreadystatechange=function(){
			if (this.readyState==4 && this.status==200){
				(typeof(c.success)=="function")&&(c.success((c.dataType=="json")?(jlite.json(this.responseText)):(this.responseText)));
			}
		}
		r.onerror=function(){if(c.error)c.error()};
		r.send((c.data||""));
		if(c.timeout)setTimeout(function(){r&&r.abort()},c.timeout);
		return true;
	}
	jlite.html=function(v){
		var _=this;
		if(!v)return _.innerHTML;
		_.innerHTML=v;
	}
	jlite.text=function(v){
		if(!v)return this.textContent;
		this.textContent=v;
	}
	jlite.click=function(f){
		var _=this;
		if(!f){
			_.click0();
			return;
		}
		(_.length)?(jlite.each(_,function(k,v){
			v.onclick=f;
			jlite._b(v);//add prototype
		})):(_.onclick=f);
	}
	jlite.addClass=function(s){
		var _=this;
		(_.length)?(jlite.each(_,function(k,v){
			(v.classList)?(v.classList.add(s)):(v.className+=' '+s)
		})):((_.classList)?(_.classList.add(s)):(_.className+=' '+s));
	}
	jlite.removeClass=function(s){
		var _=this;
		(_.length)?(jlite.each(_,function(k,v){
			(v.classList)?(v.classList.remove(s)):(v.className=v.className.replace(new RegExp('(^|\\b)'+s.split(' ').join('|')+'(\\b|$)','gi'),' '))
		})):((_.classList)?(_.classList.remove(s)):(_.className=_.className.replace(new RegExp('(^|\\b)'+s.split(' ').join('|')+'(\\b|$)','gi'),' ')));
	}
	jlite.toggleClass=function(s){
		var _=this;
		if(_.length){
			jlite.each(_,function(k,v){
				if(v.classList){
					v.classList.toggle(s)
				}else{
					var a=v.className;v.removeClass(s);if(v.className==a)v.addClass(s)
				}
			})
		}else{
			if(_.classList){
				_.classList.toggle(s)
			}else{
				var a=_.className;_.removeClass(s);if(_.className==a)_.addClass(s);
			}
		}
	}
	jlite.next=function(){
		var o=this;
		do{o=o.nextSibling;}while(o&&o.nodeType!==1);
		jlite._b(o);
		return o;
	}
	jlite.before=function(s){
		this.insertAdjacentHTML('beforebegin',s);
	}
	jlite.after=function(s){
		this.insertAdjacentHTML('afterend',s);
	}
	jlite.attr=function(s,v){
		if(!v)return this.getAttribute(s);
		this.setAttribute(s,v);
	}
	jlite._b=function(o,m){
		if(m||jlite.ie){
			o.click0=o.click;
			o.click=jlite.click;
			o.addClass=jlite.addClass;
			o.removeClass=jlite.removeClass;
			o.toggleClass=jlite.toggleClass;
			o.next=jlite.next;
			o.before=jlite.before;
			o.after=jlite.after;
			o.attr=jlite.attr;
			o.html=jlite.html;
			o.text=jlite.text;
		}
	}
	if(!jlite.ie){
		jlite._b(HTMLElement.prototype,1);
	}
	//window.onscroll action queue
	jlite.C=[];
	window.onscroll=function(){
		for(var i=0;i<jlite.C.length;i++)jlite.C[i]();
	}
	jlite.onscroll=function(f,c){
		if(c)jlite.C=[];
		else jlite.C.push(f);
	}
	win.$=win.jlite=jlite;
}(window);
