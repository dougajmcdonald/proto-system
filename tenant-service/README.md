# Intro

This repo is a mock tenant service, it's responsible for homing design system options (style properties) such as colour palettes, sizing scales etc

## Why do we need it?

If we want to have tenant theming served as runtime we need a way to store, manage and retrieve the theme. If the theme API (tenant service), consumer (mh2) and components (lantern) are kept in seperate repo's we need a place to define the source of truth. This repo is that sourvce of truth.

What is offers us:

- A single source of truth for the base design tokens within the app (those which are shared between all tenants) - We can think of these tokens as the `options` you have to choose from
- A method of defining tenant themes from these options using aliases - We can think of the themes as a set of `decisions` which comprise the brand of your tenant
- A build process which combines theme options and decisions into tenant themes based on well defined transforms (I've focussed on web, but we could also transform for native etc)

## Usage

This repo has a dev dependency on `style-dictionary` which is included as part of the build step. Building will generate a theme file which can be served up for a consuming app to use.

`npm i`
`style-dictionary build`

## Organisation

## TODO

Outstanding questions in this area include:

- Do we use one build and generate all themes as separate files / endpoints? or do we generate a single `theme` which takes a parameter to know what needs building?
- How do we handle static resources (e.g. Fonts/images) which we want to self host but also are tenant specific?
- Decide whether we can feed the design token source from Figma - https://blog.prototypr.io/design-tokens-with-figma-aef25c42430f

## Tech choices

I've opted to use style-dictionary from amazon as this has a suggestion for structuring design system options using the Category - Type - Item (CTI) format (https://amzn.github.io/style-dictionary/#/properties?id=category-type-item)

We don't have to stick with this forever but it's as good as a start point as any any gives people a reference point for usage.

For example:

| Category | Type | Item |
| colour | background | button |
| size | font | large |

Additionally, CTI supports two other properties, `sub-item` and `state`, sub item might be a type of button, e.g. primary or secondary and the state represents states either in design or html, such as active, hover etc.

[CTI diagram](https://amzn.github.io/style-dictionary/assets/cti.png)

### Useful references

https://didoo.medium.com/how-to-manage-your-design-tokens-with-style-dictionary-98c795b938aa
https://github.com/amzn/style-dictionary/tree/master/examples/advanced/multi-brand-multi-platform

# Basic Style Dictionary

This example code is bare-bones to show you what this framework can do. If you have the style-dictionary module installed globally, you can `cd` into this directory and run:

```bash
style-dictionary build
```

You should see something like this output:

```
Copying starter files...

Source style dictionary starter files created!

Running `style-dictionary build` for the first time to generate build artifacts.


scss
✔︎  build/scss/_variables.scss

android
✔︎  build/android/font_dimens.xml
✔︎  build/android/colors.xml

ios
✔︎  build/ios/StyleDictionaryColor.h
✔︎  build/ios/StyleDictionaryColor.m
✔︎  build/ios/StyleDictionarySize.h
✔︎  build/ios/StyleDictionarySize.m

ios-swift
✔︎  build/ios-swift/StyleDictionary.swift

ios-swift-separate-enums
✔︎  build/ios-swift/StyleDictionaryColor.swift
✔︎  build/ios-swift/StyleDictionarySize.swift
```

Good for you! You have now built your first style dictionary! Moving on, take a look at what we have built. This should have created a build directory and it should look like this:

```
├── README.md
├── config.json
├── properties/
│   ├── color/
│       ├── base.json
│       ├── font.json
│   ├── size/
│       ├── font.json
├── build/
│   ├── android/
│      ├── font_dimens.xml
│      ├── colors.xml
│   ├── scss/
│      ├── _variables.scss
│   ├── ios/
│      ├── StyleDictionaryColor.h
│      ├── StyleDictionaryColor.m
│      ├── StyleDictionarySize.h
│      ├── StyleDictionarySize.m
│   ├── ios-swift/
│      ├── StyleDictionary.swift
│      ├── StyleDictionaryColor.swift
│      ├── StyleDictionarySize.swift
```

If you open `config.json` you will see there are 3 platforms defined: scss, android, ios. Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

**Android**

```xml
<!-- font_dimens.xml -->
<resources>
  <dimen name="size_font_small">12.00sp</dimen>
  <dimen name="size_font_medium">16.00sp</dimen>
  <dimen name="size_font_large">32.00sp</dimen>
  <dimen name="size_font_base">16.00sp</dimen>
</resources>

<!-- colors.xml -->
<resources>
  <color name="color_base_gray_light">#ffcccccc</color>
  <color name="color_base_gray_medium">#ff999999</color>
  <color name="color_base_gray_dark">#ff111111</color>
  <color name="color_base_red">#ffff0000</color>
  <color name="color_base_green">#ff00ff00</color>
  <color name="color_font_base">#ffff0000</color>
  <color name="color_font_secondary">#ff00ff00</color>
  <color name="color_font_tertiary">#ffcccccc</color>
</resources>
```

**SCSS**

```scss
// variables.scss
$color-base-gray-light: #cccccc;
$color-base-gray-medium: #999999;
$color-base-gray-dark: #111111;
$color-base-red: #ff0000;
$color-base-green: #00ff00;
$color-font-base: #ff0000;
$color-font-secondary: #00ff00;
$color-font-tertiary: #cccccc;
$size-font-small: 0.75rem;
$size-font-medium: 1rem;
$size-font-large: 2rem;
$size-font-base: 1rem;
```

**iOS**

```objc
#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f],
[UIColor colorWithRed:0.600f green:0.600f blue:0.600f alpha:1.000f],
[UIColor colorWithRed:0.067f green:0.067f blue:0.067f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
```

Pretty nifty! This shows a few things happening:

1. The build system does a deep merge of all the property JSON files defined in the `source` attribute of `config.json`. This allows you to split up the property JSON files however you want. There are 2 JSON files with `color` as the top level key, but they get merged properly.
1. The build system resolves references to other style properties. `{size.font.medium.value}` gets resolved properly.
1. The build system handles references to property values in other files as well as you can see in `properties/color/font.json`.

Now let's make a change and see how that affects things. Open up `properties/color/base.json` and change `"#111111"` to `"#000000"`. After you make that change, save the file and re-run the build command `style-dictionary build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
