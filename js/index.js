    //合约地址
    var dappAddress = "n1fFK9nAXDRvrejLXtaUaf418QDdzyJcXWr";
    var order = "hot";

    function test123(resp,refresh){
        if(order=="hot"){
           if (!!resp){
               var result = JSON.parse(resp);
               var html = "";
               var person;
               html+='<div class="card ml-5 mr-5 mb-5 w-40 isExtension" id = "propsList">';
               html+='      <div class="card-body">';
               html+='          <p class="card-text">6000块钱投资什么好？买比特币，保存好钱包文件，忘掉你有过6000元这回事，五年后再来看看</p>';
               html+='         <p class="card-text"><small class="text-muted">预言人：blockchain</small> <small class="text-muted">2011-12-20 12:49:00</small></p>';
               html+='      </div>';
               html+=' </div>    '; 
               for (var i=0;i<result.length;i++){ 
                   console.info(i);
                   if(result[i].person){
                       person = result[i].person;
                   }else{
                       if(result[i].author){
                           if(result[i].author.length>5){
                               person = result[i].author.slice(0,5);
                           }
                       }else{
                           person = "神秘人";
                       }
                   }
                   html+='<div class="card ml-5 mr-5 mb-5 w-40">';
                   html+='<div class="card-body">';
                   html += '<p class="card-text">' + result[i].prophesy + '</p>';
                   html += '<p class="card-text"><small class="text-muted">预言人：' +  person + '</small> <small class="text-muted">';
                   html += getMyDate(result[i].timestamp) + '</small></p>';
                   html += '</div></div>';
                   if(i==result.length-1){
                       $("#propsList").html(html);
                   }
               }
           }
        }else{
           if (!!resp){
               var result = JSON.parse(resp);
               var html = "";
               var person;
   
               for (var i=result.length-1;i>=0;i--){ 
                   console.info(i);
                   if(result[i].person){
                       person = result[i].person;
                   }else{
                       if(result[i].author){
                           if(result[i].author.length>5){
                               person = result[i].author.slice(0,5);
                           }
                       }else{
                           person = "神秘人";
                       }
                   }
                   html+='<div class="card ml-5 mr-5 mb-5 w-40">';
                   html+='<div class="card-body">';
                   html += '<p class="card-text">' + result[i].prophesy + '</p>';
                   html += '<p class="card-text"><small class="text-muted">预言人：' +  person + '</small> <small class="text-muted">';
                   html += getMyDate(result[i].timestamp) + '</small></p>';
                   html += '</div></div>';
                   if(i==0){
                       html+='<div class="card ml-5 mr-5 mb-5 w-40 isExtension" id = "propsList">';
                       html+='      <div class="card-body">';
                       html+='          <p class="card-text">6000块钱投资什么好？买比特币，保存好钱包文件，忘掉你有过6000元这回事，五年后再来看看</p>';
                       html+='         <p class="card-text"><small class="text-muted">预言人：blockchain</small> <small class="text-muted">2011-12-20 12:49:00</small></p>';
                       html+='      </div>';
                       html+=' </div>    '; 
                       $("#propsList").html(html);
                   }
               }
           }
        }
   }   
function closemyFrame(){
    $("#butClose").click();
    $(".bs-example-modal-sm").modal("show");
}


    //check nebpay
    // document.addEventListener("DOMContentLoaded", function() {

    //     console.log("web page loaded...")
    //     setTimeout(checkNebpay,100);

    // });

    function checkNebpay() {
        console.log("check nebpay")
        try{
            var NebPay = require("nebpay");
            $("#switch").attr("disabled",false);
            $(".isExtension").show();
            getPropsList();
        }catch(e){
           $("#noExtension").show();
        }
    }

    function getPropsList(){
        var func = "iterate";
        var args = "[100,0]";
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
        //数据校验
        // var prophesy = $("#prophesy").val().trim();
        // if (prophesy === ""){
        //     $("#alertText").text("预言内容不能为空");
        //     $("#alertText").show();
        //     return;
        // }

        // if (prophesy.length > 100){
        //     $("#alertText").text("请输入100字以内预言");
        //     $("#alertText").show();
        //     return;
        // }

        // var person = $("#person").val().trim();

        // if (person.length > 5){
        //     $("#alertText").text("请输入5字以内昵称");
        //     $("#alertText").show();
        //     return;
        // }

        // var func = "save";
        // var args = "[\"" + prophesy + "\",\"" + person + "\"]";
     
        // window.postMessage({
        //     "target": "contentscript",
        //     "data":{
        //         "to" : dappAddress,
        //         "value" : "0",
        //         "contract" : {
        //             "function" : func,
        //             "args" : args
        //         }
        //     },
        //     "method": "neb_sendTransaction"
        // }, "*");
    })
 
    // // listen message from contentscript
    // window.addEventListener('message', function(e) {

    //     if (!!e.data.data.neb_call){
    //         var result = JSON.parse(e.data.data.neb_call.result);
    //         var html = "";
    //         var person;

    //         for (var i=0;i<result.length;i++){ 
    //             if(result[i].person){
    //                 person = result[i].person;
    //             }else{
    //                 if(result[i].author){
    //                     if(result[i].author.length>5){
    //                         person = result[i].author.slice(0,5);
    //                     }
    //                 }else{
    //                     person = "神秘人";
    //                 }
    //             }
    //             html+='<div class="card ml-5 mr-5 mb-5 w-40">';
    //             html+='<div class="card-body">';
    //             html += '<p class="card-text">' + result[i].prophesy + '</p>';
    //             html += '<p class="card-text"><small class="text-muted">预言人：' +  person + '</small> <small class="text-muted">';
    //             html += getMyDate(result[i].timestamp) + '</small></p>';
    //             html += '</div></div>';
    //             if(i==result.length-1){
    //                 $("#propsList").after(html);
    //             }
    //         }
    //     }

    // });

    //时间戳转换
    function getMyDate(str){ 
        var oDate = new Date();
        oDate.setTime(str * 1000); 
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


    //输入框点击事件
    $("#prophesy").click(
        ()=>{$("#alertText").hide()}
    );
    $("#person").click(
        ()=>{$("#alertText").hide()}
    );

    //排序点击事件
    $("#hotSort").click(
        ()=>{
            order = "hot";
            if( $("#hotSort").hasClass("btn-outline-primary")){
                $("#hotSort").removeClass("btn-outline-primary");
                $("#hotSort").addClass("sortfont");
                $("#timeSort").removeClass("sortfont");
                $("#timeSort").addClass("btn-outline-primary");
            }
            if( $("#hotSort").hasClass("sortfont")){
                $("#hotSort").removeClass("sortfont");
                $("#hotSort").addClass("btn-outline-primary");
                $("#timeSort").removeClass("btn-outline-primary");
                $("#timeSort").addClass("sortfont");
            }
            myFrame.window.getpropsList("refresh");
        }
    )
    $("#timeSort").click(
        ()=>{
            order = "time";
            if( $("#timeSort").hasClass("btn-outline-primary")){
                $("#timeSort").removeClass("btn-outline-primary");
                $("#timeSort").addClass("sortfont");
                $("#hotSort").removeClass("sortfont");
                $("#hotSort").addClass("btn-outline-primary");
            }
            if( $("#timeSort").hasClass("sortfont")){
                $("#timeSort").removeClass("sortfont");
                $("#timeSort").addClass("btn-outline-primary");
                $("#hotSort").removeClass("btn-outline-primary");
                $("#hotSort").addClass("sortfont");
            }
            myFrame.window.getpropsList("refresh");
        }
    )
    //弹窗关闭清空内容
    $('#exampleModalCenter').on('hide.bs.modal', function (e) {
        $("#person").val("");
        $("#prophesy").val("");
    })
