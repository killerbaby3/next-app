import fs from 'fs.promises';
import path from 'path';
export async function getStaticProps(){
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jData = await fs.readFile(filePath);
    const data = JSON.parse(jData);
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
                        <li key={p.id}>{p.title}</li>
                    ))}
                </ul>
            </div>;           
}