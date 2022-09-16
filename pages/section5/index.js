import fs from 'fs.promises';
import path from 'path';
import Link from 'next/link';
export async function getStaticProps(context){
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jData = await fs.readFile(filePath);
    const data = JSON.parse(jData);

    if (!data) {
        return {
            redirect : {
                destination: '/'
            }
        };
    }
    
    if (data.products.length == 0) {
        return {
            notFound:true
        };
    }
    return {
        props: {
            products : data.products,
            time: (new Date()).getTime()
        },
        revalidate:10
    };
}

export default function Section5(props){
    const { products,time } = props;
    return <div>
                <h1>Section 5 --- {time}</h1>
                <ul>
                    {products.map((p) => (
                        <li key={p.id}><Link href={`/products/section5/${p.id}`}>{p.title}</Link></li>
                    ))}
                </ul>
            </div>;           
}