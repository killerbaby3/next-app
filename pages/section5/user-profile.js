export default function UserProfilePage(props){
    return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context){
    const {params,res,req} = context;
    console.log(11,res,req);
    return {
        props : {
            username:'dat dat'
        }
    };
}