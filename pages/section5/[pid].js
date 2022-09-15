import fs from 'fs.promises';
import path from 'path';
export default function ProductDetailPage(props){
    const { productDetail } = props;
    if (!productDetail) {
        return <p>Loading ....</p>;
    }
    return <>
                <h1>{productDetail.title}</h1>
                <p>{productDetail.description}</p>
            </>
}

async function getData(){
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jData = await fs.readFile(filePath);
    const data = JSON.parse(jData);
    return data;
}

export async function getStaticProps(context){
    const data = await getData();
    const { params } = context;
    const pId = params.pid;
    const p = data.products.find(p => p.id == pId);

    if (!p) {
        return {
            notFound:true
        };
    }

    return {
        props : {
            productDetail : p
        }
    };
}

export async function getStaticPaths(){
    const data = await getData();
    let paths = [];
    data.products.map(function(p){
        paths.push({params:{pid : p.id}});
    });
    return {
        paths : paths,
        fallback: true
    };
}