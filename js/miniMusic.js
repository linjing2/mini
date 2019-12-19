$(document).ready(function () {
    $("#like").css("background-color","#7E57C2");
    $("#musicHouse").click(function () {
        $("#musicHouse").css("background-color","#7E57C2");
        $("#video").css("background-color","");
        $("#radio").css("background-color","");
        $("#like").css("background-color","");
        $("#local").css("background-color","");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","");
    });
    $("#video").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","#7E57C2");
        $("#radio").css("background-color","");
        $("#like").css("background-color","");
        $("#local").css("background-color","");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","");
    });
    $("#radio").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","");
        $("#radio").css("background-color","#7E57C2");
        $("#like").css("background-color","");
        $("#local").css("background-color","");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","");
    });
    $("#like").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","");
        $("#radio").css("background-color","");
        $("#like").css("background-color","#7E57C2");
        $("#local").css("background-color","");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","");
    });
    $("#local").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","");
        $("#radio").css("background-color","");
        $("#like").css("background-color","");
        $("#local").css("background-color","#7E57C2");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","");
    });
    $("#history").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","");
        $("#radio").css("background-color","");
        $("#like").css("background-color","");
        $("#local").css("background-color","");
        $("#history").css("background-color","#7E57C2");
        $("#recentList").css("background-color","");
    });
    $("#recentList").click(function () {
        $("#musicHouse").css("background-color","");
        $("#video").css("background-color","");
        $("#radio").css("background-color","");
        $("#like").css("background-color","");
        $("#local").css("background-color","");
        $("#history").css("background-color","");
        $("#recentList").css("background-color","#7E57C2");
    });
    var lightMode = function () {
        $("#mainWindow").css("background-color","white");
        $("#leftBox").css("background-color","#ECF0F2");
        $("#login").css("background-color","white");
        $("#headIconName").css("color","black");
        $(".leftLabel").css("color","black");
        $("#musicHouse").css("color","black");
        $("#video").css("color","black");
        $("#radio").css("color","black");
        $("#like").css("color","black");
        $("#local").css("color","black");
        $("#history").css("color","black");
        $("#recentList").css("color","black");
        $("#creatList").css("color","black");
        $("#markList").css("color","black");
        $(".songList").css("color","black");
        $("#inputSearch").css("background-color","white");
        $("#inputSearch").css("color","black");
        $("#mode").css("background-image","url('./img/light.ico')");
    };
    var darkMode = function () {
        $("#mainWindow").css("background-color","#272822");
        $("#leftBox").css("background-color","#171717");
        $("#login").css("background-color","#272822");
        $("#headIconName").css("color","yellow");
        $(".leftLabel").css("color","white");
        $("#musicHouse").css("color","white");
        $("#video").css("color","white");
        $("#radio").css("color","white");
        $("#like").css("color","white");
        $("#local").css("color","white");
        $("#history").css("color","white");
        $("#recentList").css("color","white");
        $("#creatList").css("color","white");
        $("#markList").css("color","white");
        $(".songList").css("color","white");
        $("#inputSearch").css("background-color","#272822");
        $("#inputSearch").css("color","white");
        $("#mode").css("background-image","url('./img/dark.ico')");
    };
    var isDarkMode = 1;
    $("#mode").click(function () {
        if(isDarkMode){
            lightMode();
            isDarkMode = 0;
        }else {
            darkMode();
            isDarkMode = 1
        }
    });
});