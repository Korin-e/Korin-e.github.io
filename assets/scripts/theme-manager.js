var root = $(':root').get(0).style;

ChangeTheme('dark');

function ChangeTheme(theme) {
    $.getJSON( "./assets/styles/themes/" + theme + ".json", function( data ) {
        root.setProperty('--border-color', data.borderColor);
        root.setProperty('--back-color', data.backColor);
        root.setProperty('--primary-color', data.primaryColor);
        root.setProperty('--secondary-color', data.secondaryColor);
        root.setProperty('--secondary-color-hover', data.secondaryColorHover);
        root.setProperty('--shadow-color', data.shadowColor);
        root.setProperty('--header-text-color', data.headerTextColor);
        root.setProperty('--text-color', data.textColor);
        root.setProperty('--wallpaper', "url('../images/" + data.wallpaper + "')");
    });
}