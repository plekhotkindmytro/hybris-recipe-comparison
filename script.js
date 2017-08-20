$(document).ready(function () {
    $.getJSON("recipes.json", function (data) {

        var recipeNames = data.map(function (obj) {
            return obj.recipe;
        });

        var option = '';
        for (var i = 0; i < recipeNames.length; i++) {
            option += '<option value="' + recipeNames[i] + '">' + recipeNames[i] + '</option>';
        }
        $('#recipe1Select').append(option);
        $('#recipe2Select').append(option);
        // set second selected option
        $('#recipe2Select').val(data[1].recipe);

        $('#recipe1Select, #recipe2Select').on("change", function () {

            compareRecipes($('#recipe1Select').val(), $('#recipe2Select').val(), data);
        });

        compareRecipes($('#recipe1Select').val(), $('#recipe2Select').val(), data);
    });

});

function generateHtmlListString(arr, title) {
    var ulTemplate = '<ul class="list-group">{value}</ul>';
    var liTemplate = '<li class="list-group-item">{value}</li>';
    var arrString = '';
    arr.forEach(function (obj) {
        arrString += liTemplate.replace("{value}", obj);
    });
    arrString = "<h2>" + title + "</h2>" + ulTemplate.replace("{value}", arrString);
    return arrString;
}

function compareRecipes(r1, r2, recipesData) {
    var r1Exts, r2Exts, all;
    var both = [],
        onlyInR1 = [],
        onlyInR2 = [];
    recipesData.forEach(function (obj) {
        if (obj.recipe === r1) {
            r1Exts = obj.exts;
        }

        if (obj.recipe === r2) {
            r2Exts = obj.exts;
        }
    });

    all = [...new Set(r1Exts.concat(r2Exts))];

    all.forEach(function (obj) {
        if (r1Exts.indexOf(obj) >= 0 && r2Exts.indexOf(obj) >= 0) {
            both.push(obj);
        } else if (r1Exts.indexOf(obj) >= 0) {
            onlyInR1.push(obj);
        } else if (r2Exts.indexOf(obj) >= 0) {
            onlyInR2.push(obj);
        }
    });


    var bothString = generateHtmlListString(both, "Same extensions");
    var r1String = generateHtmlListString(onlyInR1, "" + r1 + "");
    var r2String = generateHtmlListString(onlyInR2, "" + r2 + "");
    $("#result_both").html(bothString);
    $("#result_1").html(r1String);
    $("#result_2").html(r2String);

}
