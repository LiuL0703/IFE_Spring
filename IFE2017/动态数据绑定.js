/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-01 11:43:59
 * @version $Id$
 */

function Observer(data){
	this.data = data;
	this.walk(data);
}

let p = Observer.prototype;

p.walk = function(obj){
	let val;
	for (let key in obj){
		//只枚举出自动对象所拥有的属性
		if(obj.hasOwnProperty(key)){
			val = obj[key];

			// 如果还未遍历到最底层则继续new Observer
			if(typeof val ==='object'){
				new Observer(val);
			}
			this.convert(key,val);
		}
	}
};

p.convert = function(key,val){
	Object.defineProperty(this.data,key,{
		enumerable:true,
		configurable:true,
		get:function(){
			console.log("你访问了"+key);
			return val;
		},
		set:function(newVal){
			console.log("你设置了"+key);
			console.log("新的"+key+"="+newVal);

			if(newVal===val) return;
			val=newVal;
		}
	})
};

let data = {
	user:{
		name:'Louie',
		age:"20"
	},
	address:{
		province:{
			city:'BaoJi',
			other:"other"
		}
	}
};

let app = new Observer(data);
data.user.name;
data.user = {other:'sha'};

