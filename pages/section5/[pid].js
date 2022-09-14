import fs from 'fs.promises';
import path from 'path';
export default function ProductDetailPage(props){
    const { productDetail } = props;
    return <>
                <h1>{productDetail.title}</h1>
                <p>{productDetail.description}</p>
            </>
}

export async function getStaticProps(context){
    const { params } = context;
    const pId = params.pid;

    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jData = await fs.readFile(filePath);
    const data = JSON.parse(jData);

    const p = data.products.find(p => p.id == pId);
    return {
        props : {
            productDetail : p
        }
    };
}

export async function getStaticPaths(){
    const filePath = path.join(process.cwd(),'data','dummy-backend.json');
    const jData = await fs.readFile(filePath);
    const data = JSON.parse(jData);
    let paths = [];
    data.products.map(function(p){
        paths.push({params:{pid : p.id}});
    });
    return {
        // paths : [
        //     { params : { pid : 'p1' } },
        //     { params : { pid : 'p2' } }
        // ],
        paths : paths,
        fallback: false
    };
}