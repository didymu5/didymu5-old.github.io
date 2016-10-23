'use strict';
import * as fs from "fs";
import path from "path";
import * as Copy from "./bin/copy";
import fm from "front-matter";
import mkpath from "mkpath";
import siteConfig from "./site_config.json";
import {compilePostTemplates as postTemplate} from "./src/templates.js";

import rimraf from "rimraf";
import mkdirp from "mkdirp";

var markdown = require( "markdown" ).markdown;


const copyAssetsDir = (asset_dir = siteConfig.ASSETS, dist_dir = siteConfig.DIST) => Copy.copyFolderRecursiveSync(asset_dir, dist_dir);

const convert_file_from_md = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);
      if (data == undefined) reject('Need a real file');
      resolve(fm(data));
    })
  })
};
const get_content_files = (contentDir = siteConfig.CONTENT_DIR) => {
  return new Promise((resolve, reject) => {
    fs.readdir(contentDir, (err, filenames) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(filenames);
    });
  });
}
const build_content_list = (filenames, contentDir = siteConfig.CONTENT_DIR) => {
  //builds an array of objects that contain JSON data from .md
  return new Promise((resolve, reject) => {

     let document_data_list = new Array();

      filenames.forEach((filename, i) => {
        let post = fm(fs.readFileSync(contentDir + filename, 'utf-8'));
        if (!post) reject(err);
        // console.log(post);
        post.post_uri = post.attributes.slug || filename.split('.md')[0];

        post.body = markdown.toHTML(post.body);
        // console.log(markdown.toHTML(post.body), '\n\n\n\n\n');
        // console.log(post.body_html, '\n\n\n');
        if (filename === "index.md") {
          post.post_uri = "";
        }
        document_data_list[i] = post;
      });
      resolve(document_data_list);
  });
}
get_content_files().then((filenames) => build_content_list(filenames)).then((posts) => {
  let dist = siteConfig.DIST || './dist';
  if (!fs.existsSync(dist)) {
    mkdirp(dist, (err) => {
      if (err) throw err;
      console.log(`making... ${dist}\n\n`, dist);
    });
  }
  copyAssetsDir();
  posts.forEach((post, i) => {
    let path_to_dist = path.join(dist, post.post_uri);
    let site_url_list = encodeURI(post.post_uri  + '/');
    mkpath(path_to_dist, (err) => {
      if(err) throw err;
      fs.writeFile(path_to_dist+'/index.html', new Buffer(postTemplate(post), (err) => {
        if (err) throw err;
        console.info(`Creating... ${path_to_dist}\n\n`);
      }))
    });
    return site_url_list;
  });
}).catch((err) => console.error(err));
// build_content_list(siteConfig.CONTENT_DIR).then((posts) => {
//   console.log("Creating directories\n\n...\n");
//   let site_url_list = [];
//   let dist = siteConfig.DIST || './dist';

//   if (!fs.existsSync(dist)) {
//     mkdirp(dist, (err) => {
//       if (err) throw err;
//       console.log('making...', dist);
//     });
//   }

//   posts.forEach((post, i) => {
//     let path_to_dist = path.join(dist, post.post_uri);

//     site_url_list[i] = encodeURI(post.post_uri + '/');
//     (path_to_dist, (err) => {
//       if(err) throw err;
//       fs.writeFile(path_to_dist + '/index.html', postTemplate(post), (err) => {
//         if (err) throw err;
//         console.info('creating... ', path_to_dist + '/index.html');
//       })mkdirp;
//     })
//     // mkpath(path_to_dist, (err) => {
//     //   if (err) throw err;
//     //   fs.writeFile(path_to_dist + '/index.html', new Buffer(compilePostTemplates(post)), (err) => {
//     //     if (err) throw err;
//     //     console.log('creating... ', path_to_dist + '/index.html');
//     //   })
//     // });
//     return site_url_list;
//   })
// }).then(() => copyAssetsDir());