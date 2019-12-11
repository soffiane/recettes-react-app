import React, { Component } from 'react';
//wrappedcomponon est le composant a englober et renvoie une classe/fonction
const withPlaceholder = WrappedComponent => {
    return class HOC extends Component {
        render() {
            return (
                <WrappedComponent placeHolder='monHOC' 
                {...this.props}/>
            )
        }
    }
};

export default withPlaceholder