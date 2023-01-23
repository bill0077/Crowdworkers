var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

const { Resolver } = require('dns/promises');

console.log("[Server Start Running]\n\n")

var app = http.createServer(function(request,response){
  var _url = request.url;

  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var ID = queryData.id;  

  if(request.url == '/'){
    console.log("server access");
    
    var files = fs.readdirSync(`recruitment`);
    var content = ``;

    for(var i=1;i<=files.length;i++) {
        var img_src = ``
        if (fs.existsSync(`recruitment/${i}/thumbnail.jpg`)) {
            img_src = `recruitment/${i}/thumbnail.jpg`;
        }
        else if (fs.existsSync(`recruitment/${i}/thumbnail.jpeg`)) {
            img_src = `recruitment/${i}/thumbnail.jped`;
        }
        else if (fs.existsSync(`recruitment/${i}/thumbnail.png`)) {
            img_src = `recruitment/${i}/thumbnail.png`;
        }

        var info_array = fs.readFileSync(`recruitment/${i}/info.txt`).toString().split("\n");
        var title = info_array[0];
        var due = info_array[1];
        var pay = info_array[2];
        var place = info_array[3];
        var conditions = info_array[4];
        var etc = info_array[5];
        var link = info_array[6];

        var content_block = 
`<div class="grid-item" id="cartoon_${i}">
    <div class="due_note">
      <p>D-7</p>
    </div>
    <img class="thumbnail" alt="" src="${img_src}">
    <div class=wrapper_info>
      <div class="wrapper_text">
        <p class="title">${title}</p>
        <p class="due">📅날짜: ${due}</p>
        <p class="pay">💸급여: ${pay}</p>
        <p class="place">📌위치:  ${place}</p>
        <p class="conditions">📋제약사항:  ${conditions}</p>
        <p class="etc">🔔기타:  ${etc}</p>
      </div>
      <button class="w-btn w-btn-indigo" type="button" onclick="window.open('?id=${i}')">더보기</button>
      <button class="w-btn w-btn-indigo" type="button" onclick="window.open('${link}')">바로 지원</button>
    </div>
</div>
`;
        content += content_block;
    }
var template=`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CrowdWorkers</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      
      <script src="action.js"></script>
      <script src="masonry.pkgd.js"></script>
      <script src="imagesloaded.pkgd.js"></script>

      <script src="jquery.js"></script>
      <script src="slick.js"></script>
      
      <link rel="stylesheet" type="text/css" href="slick.css" >

      <link rel="stylesheet" type="text/css" href="masonry-grid_style.css" >
      <link rel="stylesheet" type="text/css" href="grid-item_style.css" >
      <link rel="stylesheet" type="text/css" href="frame_style.css" >
      <link rel="stylesheet" type="text/css" href="header_style.css" >
      <link rel="stylesheet" type="text/css" href="nav_style.css" >
      <link rel="stylesheet" type="text/css" href="footer_style.css" >
      <link rel="stylesheet" type="text/css" href="hit_style.css" >

      <link rel="stylesheet" type="text/css" href="font_style.css" >

      <link rel="stylesheet" type="text/css" href="carousel_style.css" >
      <link rel="stylesheet" type="text/css" href="carousel-item_style.css" >
    </head>
  
    <body>
      <div class="wrapper_body">
        <header>
          <div class="wrapper_header">
            <p class="logo-text">CrowdWorkers</p>
        </header>

        <footer>
          <div class="wrapper_footer">
            <!--<p class="footer-text">ⓒ 2022 illetta</p>
            <p class="footer-text">공모 등록 제의 및 기타 문의: bill0077@postech.ac.kr</p>-->
            <div class="footer-text">ⓒ 2022 illetta</div>
            <div class="footer-text">공모 등록 제의 및 기타 문의: bill0077@postech.ac.kr</div>
          </div>      
        </footer>
            
        <div class="wrapper_holy-grail">
          <nav>
          </nav>
          
          <aside>
          </aside>

          <main>



            <div class="wrapper_hit-text">
              <p class="hit-text">최근 인기 공모</p>
              <!--<div class="hit-line"></div>-->
            </div>

            <div class="wrapper_carousel">
              <button type="button" class="button_prev"><img class="button_img" alt="" src="icons/arrow_left.png"/></button>
              <button type="button" class="button_next"><img class="button_img" alt="" src="icons/arrow_right.png"/></button>
              <div class="carousel">
                <a href="?id=1">
                  <div><img class="hit_thumbnail" alt="" src="cartoons_hit/hit-1_img.jpg"></div>
                </a>
                <a href="?id=2">
                <div><img class="hit_thumbnail" alt="" src="cartoons_hit/hit-2_img.png"></div>
                </a>
                <a href="?id=3">
                <div><img class="hit_thumbnail" alt="" src="cartoons_hit/hit-3_img.png"></div>
                </a>
              </div>
            </div>

            <script src="carousel_item.js"></script>

            <div class="wrapper_grid-text">
              <p class="grid-text">현재 진행중인 공모</p>
              <!--<div class="grid-line"></div>-->
            </div>

            <div class="wrapper_category">
              <div class="category_icon">전체</div>
              <div class="category_icon">재택 가능</div>
              <div class="category_icon">마감 임박</div>
              <div class="category_icon">비경력</div>
              <div class="category_icon">비전문분야</div>
            </div>

            <!--<div class="grid-line"></div>-->

            <div class="grid">
              <div class="grid-sizer"></div>

              ${content}
              
              </div>             
            </div>
            
            <script src="masonry_item.js"></script>

          </main>
        </div>
      </div>
    </body>
</html>
`;
    response.writeHead(302);
    response.end(template);
  }
  else if(ID!=null) {
    var files = fs.readdirSync(`recruitment`);
    if(Number.isInteger(Number(ID)) && 1 <= ID && ID <= files.length) {
      var img_src = ``
      if (fs.existsSync(`recruitment/${ID}/thumbnail.jpg`)) {
          img_src = `recruitment/${ID}/thumbnail.jpg`
      }
      else if (fs.existsSync(`recruitment/${ID}/thumbnail.jpeg`)) {
          img_src = `recruitment/${ID}/thumbnail.jped`
      }
      else if (fs.existsSync(`recruitment/${ID}/thumbnail.png`)) {
          img_src = `recruitment/${ID}/thumbnail.png`
      }


      var data = fs.readFileSync(`recruitment/${ID}/data.txt`);
      var info_array = fs.readFileSync(`recruitment/${ID}/info.txt`).toString().split("\n");
      var title = info_array[0];
      var due = info_array[1];
      var pay = info_array[2];
      var place = info_array[3];
      var conditions = info_array[4];
      var etc = info_array[5];
      var link = info_array[6];

      var content_block = 
`<div class="wrapper_view-page" id="cartoon_${ID}">
  <div class="wrapper_img">
    <img class="thumbnail" alt="" src="${img_src}">
  </div>
  <div class="wrapper_info">
    <p class="title">${title}</p>
    <p class="due">📅날짜: ${due}</p>
    <p class="pay">💸급여: ${pay}</p>
    <p class="place">📌위치:  ${place}</p>
    <p class="conditions">📋제약사항:  ${conditions}</p>
    <p class="etc">🔔기타:  ${etc}</p>
    <button class="w-btn w-btn-indigo" type="button" onclick="window.open('${link}')">바로 지원</button>
    <pre class="data">${data}</pre>
  </div>
</div>
`
      var content = content_block;
      var template=`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CrowdWorkers</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      
      <script src="action.js"></script>
      <script src="masonry.pkgd.js"></script>
      <script src="imagesloaded.pkgd.js"></script>

      <script src="jquery.js"></script>
      <script src="slick.js"></script>
      <link rel="stylesheet" type="text/css" href="slick.css" >

      <link rel="stylesheet" type="text/css" href="masonry-grid_style.css" >
      <link rel="stylesheet" type="text/css" href="grid-item_style.css" >
      <link rel="stylesheet" type="text/css" href="frame_style.css" >
      <link rel="stylesheet" type="text/css" href="header_style.css" >
      <link rel="stylesheet" type="text/css" href="nav_style.css" >
      <link rel="stylesheet" type="text/css" href="footer_style.css" >
      <link rel="stylesheet" type="text/css" href="hit_style.css" >
      <link rel="stylesheet" type="text/css" href="view-page_style.css" >

      <link rel="stylesheet" type="text/css" href="carousel_style.css" >
      <link rel="stylesheet" type="text/css" href="carousel-item_style.css" >
    </head>
  
    <body>
      <div class="wrapper_body">
        <header>
          <div class="wrapper_header">
            <p class="logo-text">CrowdWorkersss</p>
        </header>

        <footer>
          <div class="wrapper_footer">
            <!--<p class="footer-text">ⓒ 2022 illetta</p>
            <p class="footer-text">공모 등록 제의 및 기타 문의: bill0077@postech.ac.kr</p>-->
            <div class="footer-text">ⓒ 2022 illetta</div>
            <div class="footer-text">공모 등록 제의 및 기타 문의: bill0077@postech.ac.kr</div>
          </div>      
        </footer>
            
        <div class="wrapper_holy-grail">
          <nav>
          </nav>
          
          <aside>
          </aside>

          <main>

              ${content}           

          </main>
        </div>
      </div>
    </body>
</html>
`
      response.writeHead(302);
      response.end(template);
    }
    else{
      response.writeHead(302);
      response.end(template);
    }

  }
  else if(fs.existsSync(__dirname + _url)){
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + _url));
  }
  else if(pathname == "/submit_form") {
    var body=''
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);

      console.log("survey submited");
      //console.log(post);
    });

    /*설문 완료 페이지로 리다이렉트*/
    response.writeHead(302, {
      Location: `/survey_submitted.html`
    }).end();
  
  }
  else {
    response.writeHead(404);
    response.end();
  }


});
app.listen(3000);