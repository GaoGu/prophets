    //合约地址
    var dappAddress = "n1xzRB1JEGseX5H7nvtEsdWoR5KxfBfNwqT";
    
    //check nebpay
    document.addEventListener("DOMContentLoaded", function() {

        console.log("web page loaded...")
        setTimeout(checkNebpay,100);

    });

    function checkNebpay() {
        console.log("check nebpay")
        try{

            var NebPay = require("nebpay");
            getPropsList();
        }catch(e){

        }
    }

    function getPropsList(){
        var func = "iterate";
        var args = "[10,0]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : args
                }
            },
            "method": "neb_call"
        }, "*");
    }

    //提交预言
    $("#push").click(function() {
        console.log("********* call smart contract \"sendTransaction\" *****************")
        var func = "save";
        var args = "[\"" + $("#prophesy").val() + "\"]";

        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappAddress,
                "value" : "0",
                "contract" : {
                    "function" : func,
                    "args" : args
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
    })

    // listen message from contentscript
    window.addEventListener('message', function(e) {

        if (!!e.data.data.neb_sendTransaction){
            var result = JSON.stringify(data.data.neb_sendTransaction.result);
            if(result){
                console.info("111");
                this.console.info(result);
            }
        }
        if (!!e.data.data.neb_call){
            var result = JSON.parse(e.data.data.neb_call.result);
            var html = "";
            for (var i=0;i<result.length;i++){ 
                html += result[i].author + "<br>";
                html += result[i].value + "<br>";
                html += getMyDate(result[i].timestamp) + "<br>";
                if(i==result.length-1){
                    $("#propsList").html(html);
                }
            }
        }

    });

    //时间戳转换
    function getMyDate(str){  
        var oDate = new Date(str),  
        oYear = oDate.getFullYear(),  
        oMonth = oDate.getMonth()+1,  
        oDay = oDate.getDate(),  
        oHour = oDate.getHours(),  
        oMin = oDate.getMinutes(),  
        oSen = oDate.getSeconds(),  
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
        return oTime;  
    }; 
    //补0操作
    function getzf(num){  
        if(parseInt(num) < 10){  
            num = '0'+num;  
        }  
        return num;  
    }



