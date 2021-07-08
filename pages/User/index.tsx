import React, { useState } from 'react'
import { IData, IUser } from '../../model/User'
import { NextPage ,NextPageContext,GetServerSideProps, GetStaticProps} from 'next';
import { NavLink } from '../../components/NavLink';
import {firebaseService} from '../../services'
 


type Users = {
    id: string;
    Data: {email: string, name: string, phone: string};
    
  };  
 
const IndexPage: NextPage<{users: IUser[]}> = ({users}) => {

return(
    <div>
    <h1>Users</h1>
    <NavLink href="/User/Add"><a className="btn btn-sm btn-success mb-2">Add User</a></NavLink>
    <table className="table table-striped">
        <thead>
            <tr>
                <th style={{ width: '30%' }}>Name</th>
                <th style={{ width: '30%' }}>Email</th>
                <th style={{ width: '30%' }}>Phone</th>
                <th style={{ width: '10%' }}></th>
            </tr>
        </thead>
         <tbody>
            {users && users.map((user:any) =>
           
                <tr key={user.id}>
                    <td>{user.data.name}</td>
                    <td>{user.data.email}</td>
                    <td>{user.data.phone}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                        <NavLink href={`/User/Edit/${user.id}`}><a className="btn btn-sm btn-primary mr-1">Edit</a></NavLink>
                        {/* <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                            {user.isDeleting 
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button> */}
                    </td>
                </tr>
            )}
            {!users &&
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="spinner-border spinner-border-lg align-center"></div>
                    </td>
                </tr>
            }
            {users && !users.length &&
                <tr>
                    <td colSpan={4} className="text-center">
                        <div className="p-2">No Users To Display</div>
                    </td>
                </tr>
            }
        </tbody> 
    </table>
</div>
)}

// 2. This no longer causes a type error
export const getServerSideProps: GetServerSideProps = async ({
    params, res
  }) => {
    try {        
        let users: any = [];
        var fbService = new firebaseService("User");
        await fbService.getAll().then((value:any) =>{
            
            users = value as IUser[];
            // console.log(JSON.stringify(users));
        })
        
     
  
      return {
        props:  {users} 
      };
    } catch {
      res.statusCode = 404;
      return {
        props: {}
      };
    }
  };


export default IndexPage;