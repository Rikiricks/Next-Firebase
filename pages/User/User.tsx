import React from 'react';
import {firebaseService} from '../../services'

type MyProps = {
    message: string}

type MyState = {
    count: number
}
var fbService: any;
 export default class User extends React.Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props);
        
        // fbService = new firebaseService("User");

    }

    componentDidMount(){
        
        this.setState({count: 5});
          
    //   fbService.getAll().then((value: any) => console.log(JSON.stringify(value)));
        
    }

    public static defaultProps = {
        message: "Home Page"
    };

    state: MyState = {
        // optional second annotation for better type inference
        count: 0,
      };
    render() {
        return (
            <>
            <div>
               <h1> {this.props.message} {this.state.count}</h1>
            </div>
            </>
        );
    }
}

