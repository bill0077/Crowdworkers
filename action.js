function thumbnail_focused(cartoon_id){
    timer = setTimeout(function() {
        thumbnail_focused_t(cartoon_id);
    }, 1000*1);
}

function thumbnail_focused_t(cartoon_id){
    var griditem = document.getElementById(cartoon_id);
    var thumbnail = griditem.getElementsByClassName("thumbnail");
    //griditem.style.width=100;
    griditem.style.zIndex=1;
    //griditem.style.overflow="scroll";
    /*griditem.style.height=10000;*/
    /*thumbnail[0].height=10000;*/

    thumbnail[0].style.opacity='0';

    setTimeout(function() {
        griditem.style.boxShadow="0 5px 18px -7px rgba(0,0,0,1)";
        //box-shadow: 0 5px 18px -7px rgba(0,0,0,1);
        thumbnail[0].src="cartoons/1_full.png";
        thumbnail[0].style.opacity='1';
    }, 1000*0.05);
}

function thumbnail_focusedout(cartoon_id){
    clearTimeout(timer);

    var griditem = document.getElementById(cartoon_id);
    var thumbnail = griditem.getElementsByClassName("thumbnail");

    thumbnail[0].src="cartoons/1.png";
    var y_pos = window.pageYOffset + griditem.getBoundingClientRect().top;
    window.scroll({top : y_pos-200 , behavior: 'smooth'});
    griditem.style.boxShadow="none";
}