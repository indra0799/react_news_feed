import React, { useState } from 'react'
import './news_posts.css';

const News_posts = ({news}) => {
    // page_count for identifing news posts
    const [page_count , setPage_count] = useState(0);

    //lenght of posts
    const news_arr_size = news.length ;

    // these funtions for increasing and decreasing index value of news posts using buttons
    const increase_Count = () =>{
        if(page_count + 1 < news_arr_size){
            setPage_count(page_count + 1);
        }
    };
    const decrease_Count = () =>{
        if(page_count - 1 >= 0){
            setPage_count(page_count - 1);
        }
    };
     
    // function to changing date string format from dd-mm-yyyyTtttt to 1 jan 2024
    function formatDate(dateString) {
    
    const [datePart] = dateString.split('T');

   
    const [day, month, year] = datePart.split('-');

 
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    
    const monthName = months[parseInt(month, 10) - 1];

   
    return `${day} ${monthName} ${year}`;
}

    const news_data = news[page_count] ;
   
                                {/* checking if the news posts array is empty or not */}
    return (
        <div className='news_post1'>{ news_data &&   
        <div className='news_post'>
            <div className='1st_block_post'>

                
            <div className='img'  >
                <img className = "news_image" src= {news[page_count].urlToImage} alt="image not found" />
            </div>
            <h4 className='news_title'>{news[page_count].title}</h4>
            
            <div className='news_date'>
                <span>{ formatDate(news[page_count].publishedAt) }</span>

            </div >
                { /* these two lines for displaying content of news if it null than ignores*/}
               { (news[page_count].content && news[page_count].content.length > 20) && <p className='news_content'>{news[page_count].content.substring(0, news[page_count].content.length-14)}</p> }
               { !(news[page_count].content && news[page_count].content.length > 20) && <p className='news_content'>content not found</p> }
            
                <p className='news_source'>Source: <span className='news_source_name'>{news[page_count].source.name}</span> </p>
            
            </div>
            
            <div className='2nd_block_post'>
            { /* thses two buttons for changing news posts from  previous to next  vice versa*/}
            <div className='bnts'>
                <div className='bnt_block'>
                { page_count > 0 && <button className='previous_bnt' onClick={decrease_Count}>Prev</button>}
                { page_count <=0 && <button className='prev_span'>Prev</button>}
                </div>
                <div className='bnt_block'>
                { page_count < news_arr_size - 1  && <button className='next_bnt' onClick={ increase_Count}>Next</button> }
                { page_count >= news_arr_size-1 && <button  className='next_span'> Next</button>}
                </div>
            </div>

            </div>
        </div>
}</div>
    )

 
}

export default News_posts