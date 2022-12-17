const baseurl = "https://whenessel.github.io";

$('.view_recipe').click(function(){
  $('#recipe').toggle();
  var offset = $('#recipe').offset();
  $('html').animate({scrollTop : offset.top}, 400);
});

function isitem(element, item)  {
  if(element.no === item)  {
    return true;
  }
}
function get_top(item, lng){
  var txt = "";
  if (lng == "jp"){
    txt += "<a href=\""+baseurl+"/"+lng+"/alchemist/?item="+item+"&type=1\">ふつう錬金</a>";
    txt += "<a href=\""+baseurl+"/"+lng+"/alchemist/?item="+item+"&type=2\">上級錬金</a>";
  } else {
    txt += "<a href=\""+baseurl+"/"+lng+"/alchemist/?item="+item+"&type=1\">일반 연금</a>";
    txt += "<a href=\""+baseurl+"/"+lng+"/alchemist/?item="+item+"&type=2\">상급 연금</a>";
  }
  var my_list2=document.getElementById("searching_recipe");
  my_list2.innerHTML = txt;
}
function find_material(searching_recipe, type, lng){
  var recipe_material = "<ul class='recipe_list'>";
    $.getJSON(baseurl+"/alchemist/"+type+".json?version=20220801", function(data) {
      for (var i=0; i < data.length;++i){
        if(data[i]['no'] == searching_recipe){
          for (var j=0; j < data[i]['recipe'].length;++j){
            if (lng == "jp"){
              find_recipe = data[i]['jp'][j].split(',');
            } else {
              find_recipe = data[i]['recipe'][j].split(',');
            }

            if(find_recipe[0] === undefined){
              find_recipe[0] = '';
            } else {
              recipe_material += "<li>";
              recipe_material += "<span>"+find_recipe[0]+"</span>";
            }

            if(find_recipe[1] === undefined){
              find_recipe[1] = '';
            } else {
              recipe_material += "<span>"+find_recipe[1]+"</span>";
            }

            if(find_recipe[2] === undefined){
              find_recipe[2] = '';
            } else {
              recipe_material += "<span>"+find_recipe[2]+"</span>";
            }

            if(find_recipe[3] === undefined){
              find_recipe[3] = '';
            } else {
              recipe_material += "<span>"+find_recipe[3]+"</span>";
            }

            if(find_recipe[4] === undefined){
              find_recipe[4] = '';
            } else {
              recipe_material += "<span>"+find_recipe[4]+"</span>";
            }
            if(find_recipe[0] === undefined){
              recipe_material += "</li>";
            }
          }

          break;
        }
      }
      if (recipe_material != "<ul class='recipe_list'>"){
        recipe_material += "</ul>";
        document.getElementById("recipe_material").innerHTML = recipe_material;

        $('#recipe_material').show();
      }

    });
}

let searching_item = getParameterByName('item');
let searching_recipe = getParameterByName('recipe');
let searching_type = getParameterByName('type');

function get_recipe(data, lng, type){
  var step = '';
  var find = '';
  let recipe;

  if(type == 'normal'){
    find += "<ul class=\"normal_alc\">";
    if(lng == "jp"){
      find += "<h1>ふつう錬金</h1>";
    } else {
      find += "<h1>일반 연금</h1>";
    }
    for (var i=0; i < data.normal.length;++i){
      step = data.normal[i].split(',');
      recipe = step[2].split('-');
      if(lng == "jp"){
        find += "<li onclick=\"find_material('"+recipe[0]+"', '"+type+"', '"+lng+"');\"><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span> +"+step[0]+" "+data.jp+" ("+step[1]+")</li>";
      } else {
        find += "<li onclick=\"find_material('"+recipe[0]+"', '"+type+"', '"+lng+"');\"><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span> +"+step[0]+" "+data.ko+" ("+step[1]+")</li>";
      }
    }
  } else if(type == 'top'){
    find += "<ul class=\"top_alc\">";
    if(lng == "jp"){
      find += "<h1>上級錬金</h1>";
    } else {
      find += "<h1>상급 연금</h1>";
    }
    for (var i=0; i < data.top.length;++i){
      step = data.top[i].split(',');
      recipe = step[2].split('-');
      if(lng == "jp"){
        find += "<li onclick=\"find_material('"+recipe[0]+"', '"+type+"', '"+lng+"');\"><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span> +"+step[0]+" "+data.jp+" ("+step[1]+")</li>";
      } else {
        find += "<li onclick=\"find_material('"+recipe[0]+"', '"+type+"', '"+lng+"');\"><span>"+recipe[0]+"</span><span>"+recipe[1]+"</span> +"+step[0]+" "+data.ko+" ("+step[1]+")</li>";
      }
    }
  }
  find += "</ul>";

  var my_list2=document.getElementById("searching_find");
  my_list2.innerHTML = find;
}

function get_item(item, lng, type){
  let item_type;
  let item_type1 = item.substr(0, 2);
  let item_type2 = item.substr(2, 2);

  if(item_type1 == 10){ // 무기
    item_type = "weapone";
  } else if(item_type1 == 20){ // 방어구
    item_type = "armor";
  } else if(item_type1 == 30){ // 장신구
    item_type = "accessary";
  } else if(item_type1 == 31){ // 장신구
    item_type = "rune";
  } else if(item_type1 == 50){ // 스킬
    item_type = "skill";
  } else if(item_type1 == 60){ // 기타
    item_type = "etc";
  } else if(item_type1 == 70){ // 마력석
    item_type = "stone";
  }
  if(type == 2){
    type = "top";
  } else {
    type = "normal";
  }

  console.log(baseurl+"/item/"+type+"/"+item_type+"/"+item_type2+".json");
  $.getJSON(baseurl+"/item/"+type+"/"+item_type+"/"+item_type2+".json", function(data) {
    const info = data.find(v => v.id == item);

    if (lng == "jp"){
      document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+info.icon+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+info.jp;
    } else {
      document.getElementById("searching_item").innerHTML = "<img class=\"thumb2\" src=\"https://wstatic-cdn.plaync.com/powerbook/l2m/icon/Icon_128/Item/Icon_"+info.icon+"\" onerror=\"this.src='https://wstatic-cdn.plaync.com/plaync/gameinfo/img/thumb-lineage2m.png';\">"+info.ko;
    }

    get_recipe(info, lng, type);
  });
}

if(searching_item){
  get_item(searching_item, lng, searching_type);
  get_top(searching_item, lng);
}
