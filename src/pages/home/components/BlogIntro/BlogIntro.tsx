import React, { useEffect, useState } from 'react'
import { GetAllOrderedData } from '../../../../api/CRUD_API';
import blog_logo from '../../../../assets/images/home/blogintro/logo.png'
import AppButton from '../../../../global_components/AppButton';
import TitlePage from '../../../../global_components/TitlePage';
import BlogSummary from './sub_components/BlogSummary';
import Loading from '../../../../global_components/Loading';

const BlogIntro = () => {
    const [latestBlogs, setLatestBlogs] = useState<any>([]);

    useEffect(() => {
        GetAllOrderedData('createdAt', 'blogs').then((orderByViewBlogs) => {
            setLatestBlogs(orderByViewBlogs.slice(0, 3))
        })
    }, [])

    return (
        <div className="flex sm:bg-[url(https://firebasestorage.googleapis.com/v0/b/mythworld-ef1f6.appspot.com/o/background1.jpg?alt=media&token=e0e280ae-059b-4f1e-9e5d-f735fc3d2de7)] 
            bg-cover items-center justify-around"
        >
            <div className='max-lg:hidden w-1/4'>
                <div className="flex my-2 cursor-default"
                >
                    <img
                        src={blog_logo}
                        alt="logo"
                        className="w-16 h-16 mt-1.5 mx-2"
                    />
                    <p className={`text-white px-0 pt-3.5 md:pt-4 
                    text-5xl
                `}>
                        Mythicala
                    </p>
                </div>
                <p className='text-white text-base lg:text-lg'>
                    A collection of myths related to Mythicom's products, and more...
                </p>
                <a href='https://mythicala.vercel.app/blogs'>
                    <AppButton content='Explore' className='text-white' />
                </a>
            </div>
            <div className='sm:bg-brown w-full sm:w-4/5 sm:text-white lg:w-1/2 xl:w-2/5 pt-4 sm:rounded-xl sm:my-8'>
                <TitlePage title='Latest myths' className='max-lg:hidden text-3xl xl:text-5xl' />
                <TitlePage title='Mythicala' className='lg:hidden text-3xl md:text-5xl' />
                {
                    latestBlogs.length > 0 ?
                        <div className=''>
                            {
                                latestBlogs.map((blog: any) => <BlogSummary data={blog} key={blog.id} />)
                            }
                        </div> : 
                        <Loading />
                }
                <a href='https://mythicala.vercel.app/blogs'>
                    <AppButton content='Explore' className='lg:hidden mx-auto text-white' />
                </a>
            </div>
        </div>
    )
}

export default BlogIntro
