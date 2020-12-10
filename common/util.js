function hideName(name) {
	if(!name){
		return '';
	}
	if (name.length == 2) {
		name = '*' + name.slice(1, name.length);
	} else if (name.length > 2) {
		name = name.slice(0, 1) + '*' + name.slice(2, name.length);
	}
	return name;
}
//两个数组的差集
function findDifferentElements(array1, array2) {
	return array1.filter(function(v){ return array2.indexOf(v) == -1 });
}
//转大写
function chineseNumeral(data){
	let tmpnewchar = "" ;
		for(let char of data){
			switch (char) {
	            case "0":   tmpnewchar =  tmpnewchar + "零" ;break;
	            case "1":  tmpnewchar =  tmpnewchar + "一" ; break;
	            case "2":  tmpnewchar =  tmpnewchar + "二" ; break;
	            case "3":  tmpnewchar =  tmpnewchar + "三" ; break;
	            case "4":  tmpnewchar =  tmpnewchar + "四" ; break;
	            case "5":  tmpnewchar =  tmpnewchar + "五" ; break;
	            case "6":  tmpnewchar =  tmpnewchar + "六" ; break;
	            case "7":  tmpnewchar =  tmpnewchar + "七" ; break;
	            case "8":  tmpnewchar =  tmpnewchar + "八" ; break;
	            case "9":  tmpnewchar =  tmpnewchar + "九" ; break;
				default: tmpnewchar = tmpnewchar + char;
	        }
	}
	return tmpnewchar;
}

module.exports = {
	hideName,
	findDifferentElements,
	chineseNumeral,
}