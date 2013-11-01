$(document).ready(function () {
  $("#overlay").hide();
  $("#quizpzrent").hide();
  var v;
  var qustioncount=0;
  var used = new Array();
  var z = { q0: {
    qus: "Why is the heat shield needed?",
    opt: { op1: "The air on Mars is very very hot.", op2: "Friction heats things travelling at supersonic speeds.", op3: "Spacecraft are be damaged by their own rockets.", op4: "To fend off Vikings." },
    ans: "2"
    },
    q1: {
    qus: "What is evidence for water on Mars?",
    opt: { op1: "Volcanoes and mountains", op2: "Craters", op3: "Sedimentary rock", op4: "Dry ice", op5: "All of the above" },
    ans: "3"
    },
    q2: {
    qus: "What is the most important ingredient for life?",
    opt: { op1: "Water", op2: "Oxygen", op3: "Sunlight", op4: "Vegemite" },
    ans: "1"
    },
    q3: {
    qus: "Why is Mars Red?",
    opt: { op1: "the colour of the soil", op2: "iron oxide", op3: "rust", op4: "All of the above" },
    ans: "4"
    }
  };
  $("#close").tap(function () {
    $("#quizpzrent").hide();
    $("#overlay").hide();
  });
  $("#options").on('tap','.option',function () {
    used.push(v);
    var value = $(this).attr('value');
    if (value == $("#ans").val()) {
      $("#result").html('<h5>THIS IS THE</h5><h4>CORRECT</h4><h5>ANSWER</h5><h4>Click To Next question</h4>');
      $("#question").text("CONGRATULATIONS");
    }
    else {
      $("#result").html('<h5>THAT IS THE</h5><h4>INCORRECT</h4><h5>Answer</h5><h4>Click To Next question</h4>');
      $("#question").text("SORRY");
    }
    $("#options").hide();
    $("#options1").show(); 
    setTimeout(function(){
      $('#result').show().css('z-index','10');                                  
    },500);
  });
  $("#result").tap(function () {
    $('#result').show();    
    if(used.length<qustioncount) {
      $("#options1").hide();
      myfunction();
      $("#options").show();
    }
    else
    {
      $("#options1").show();
      $("#result").html('<h5 >QUIZ END</h5>');
      $("#question").text("");
    }
  });
  $("#openquiz").tap(function () {
//    if(used.length<qustioncount) {
      used = new Array();
      myfunction();
      $("#quizpzrent").show();
      $("#quiz").show();
      $("#question").show();
      $("#close").show();
      $("#options").show();
      $("#options1").hide();
      $("#result").hide();
      $("#overlay").show();
/*    }
    else
    {
      $("#quiz").show();
      $("#question").show();
      $("#close").show();
      $("#options").hide();
      $("#options1").show();
      $("#Sresult").html('<h5 style="top:30px">QUIZ END</h5>');
      $("#question").text("");
      $("#overlay").show();
    }*/
  });
  check();
  function check() {
    for (opti in z)
    {
      ++qustioncount;
    }                            
  }
  function myfunction() {
    $('#option1').css('z-index','-10');
    if(used.length<qustioncount)
    {
      var num = Math.floor((Math.random() * qustioncount));
      v = "q" + num;
      if(used.indexOf(v)==-1)
      {
        var writeoption='';
        var count=0;
        for (opti in z[v]['opt'])
        {
          ++count;
        }                            
        $("#question").text(z[v]['qus']);
        var i=1;
        var size=(400-(13*(count+1)))/count;
        for (opti in z[v]['opt'])
        {
          writeoption += '<div style="top:' + (13*i+(i-1)*size) + 'px; height: '+size+'px;" class="option" value="' + i + '"><h5>' + z[v]['opt']['op'+i] + '</h5></div>';  
          ++i;
        }
        $("#options").html(writeoption);
        $("#ans").val(z[v]['ans']);                          
      }
      else
      {
        myfunction();
      }
    }
  }
});