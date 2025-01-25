## Getting Started

First, install the packages on your local machine.

```bash
npm install
```

Before running the server, you will need to create some certificates.

```bash
./setup-dev-certs.sh
```

Next, run the development server on your local machine

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

The page auto-updates as you edit the files.

## Style

The project is setup to not accept any colors except the colors provided by NCDPR and the supporting colors (plus a select few system colors). When you need to use a color, select one from the following list and you can use that color name. Colors in the figma file are labeled with the corresponding color to make it easier for you.

### Main colors
- main_green
- main_blue
### Secondary colors
- secondary_lime
- secondary_darkteal
- secondary_teal
- secondary_orange
- secondary_lightgreen
- secondary_lightblue
### Icon colors
- icon_camping
- icon_activities
- icon_amenities
### Trail colors
- trail_equine
- trail_roanokeriver
- trail_hawriver
- trail_danriver
- trail_overmountainvictory
- trail_wildernessgateway
- trail_hickorynutgorge
- trail_northernpeaks
- trail_eastcoastgreenway
- trail_fontaflora
- trail_mountainstosea
- trail_deepriver
- trail_yadkinriver
- trail_frenchbroadrive
### Supporting colors
- supporting_inactiveblue
- supporting_lightblue
- supporting_darkgray
- supporting_bluegray
- supporting_lightgray
- supporting_lightorange
### System colors
- system_black
- system_white
- system_gray
- system_red
- system_blue

The font style for h1-h5 and p tags has been set for you already. If you are copying something from figma, look at the font section to see what style/type of tag to use. There are some additional ones that will require the use of a class name as you are coding which are as follows:
- mini paragraph (some smaller text) -> p tag with class "p-mini"
- large paragraph (some text that should be larger but isn't classified as a heading) -> p tag with class "p-large"
- button (the text to be used INSIDE of a button) -> p tag with class "button-text"
- script used on splash screen -> p tag with class "script"
- link (usually a paragraph on figma with the color set to system_blue and underlined) -> (a tag) OR (p tag with class "link")
- mini link (usually a mini paragraph in figma with color blue and underlined) -> (either a or p tag) with class "link-mini"
- warning text (usually denoted in red or red and italicized on figma) -> (any tag and class combination above or just a tag) with class "warning"

## Project structure

public/ houses all assets (fonts, images, icons, manifest files, service workers) needed for the project and ensuring PWA compatibility.

src/ houses the source files for the functionality of the app

> src/components/ stores the reusable components

>> src/components/common/ houses the components that are used across multiple tabs

>> src/components/layout/ houses the components that are needed for layout such as header, footer, etc

>> src/components/tabs/ houses components specific to each tab. There is a subdirecroty for each tab

>src/context/ houses the global contexts (used to pass information between components across the app)

>src/NOTINUSE/ houses some of the files that Adam made while he was testing the different functionalities such as GPS and certain offline features. These files are not being used anywhere else in the program but are being kept temporarily for us to refer to as we implement these features in the actual app.

> src/pages/ holds the basic structure for each page of the app (this is where all the components are put together to create a page). There is a subdirectory for each tab as well as some files that are loose because they do not involve any particular tab.

> src/styles/ holds the css files for the app. Try to keep the number of css files to a minimum while also breaking things up into manageable chunks (not one massive file).

> src/utils/ holds other random utility files such as the file that registers our service worker.

There are several other files at this level (inside root but not inside public or src subdirectories). These files are used to set up the project and generally do not need to be messed with unless configuring a specific package.
