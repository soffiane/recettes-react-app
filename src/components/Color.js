//Ce component va servir de context 
//On va englober avec ce component, les component dont on souhaite qu'ils utilisent ce context
import React, { Component } from 'react';

const ColorContext = React.createContext()

class ColorProvider extends Component {
    state = {
        color: 'blue'
    }
    render() {
        return (
            //le Provider va fournir le context qui va etre consommé pr Un consumer
            <ColorContext.Provider
                value={{
                    state: this.state
                }}>
                {this.props.children}
            </ColorContext.Provider>
        );
    }
}
export {ColorContext}
export default ColorProvider;