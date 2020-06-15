import React, {Component} from 'react'

class ErrorBoundary extends Component {

    constructor(props){
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(){
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }

    render(){
        if(this.state.hasError === true){
            return (<div>Errror Page</div>)
        }

        return this.props.children;
    }
}

export default ErrorBoundary;