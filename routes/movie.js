var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
 
var numOfMovies = 10;
var parsedResults = new Array();
 
/* GET home page. */
router.get( '/', function( req, res ) {
 
  request('https://blog.naver.com/PostList.nhn?blogId=familyman80&from=postList&categoryNo=15',
    function ( error, response, html ) {
 
      if ( !error && response.statusCode == 200 ) {
        var $ = cheerio.load( html );
 
        parsedResults = [];
 
        var cnt = 0;
 
        $('.item').each( function ( i, element ) {
 
          if ( cnt < numOfMovies ) {
            var blog_item = $(this);
            var blog_thumb = blog_item.find('.thumb').attr('src');
            var blog_title = blog_item.find('.title').text();

            console.log(blog_title);
            
 
            // Our parsed meta data object
            var metadata = {
            //   movieTitle: movie_title,
            //   movieRating: movie_rating
                blogThumb : blog_thumb,
                blogTitle : blog_title
            };
 
            // Push meta-data into parsedResults array
            parsedResults.push( metadata );
          }
 
          cnt++;
        });
 
        res.render( 'movie', {
          title: 'Movie Page Web Scraping',
          metadata: parsedResults
        } );
 
      }
 
  });
 
} );
 
module.exports = router;