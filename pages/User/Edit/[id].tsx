import { GetServerSideProps, GetStaticProps,GetStaticPaths } from "next";
import { IUser } from "../../../model/User";
import {firebaseService} from '../../../services/firebase.service';
import {AddEdit} from "../AddOrEdit"
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
    slug: string
}


export const getStaticPaths: GetStaticPaths = async () => {
  let users: any = [];
        var fbService = new firebaseService("User");
        await fbService.getAll().then((value:any) =>{
            
            users = value as IUser[];
            // console.log(JSON.stringify(users));
        })
console.log("path");
  const paths = users.map((data:any) => {
      return {
          params: { id: data.id },
      }
  })
  return { paths,  fallback: false }
}

export const  getStaticProps: GetStaticProps = async (context) => {

    debugger;
    console.log("prop");
  var firebase = new firebaseService("User");
  let user: any = {};
  const { id } = context.params as IParams
  await firebase.getById(id).then((value:any) =>{
      debugger;
        user = value;
  });

   return {
    props: { user }
    }
}


export default AddEdit;