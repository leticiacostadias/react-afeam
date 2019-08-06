import React, { Component } from 'react';

class Produto extends Component {
    render() {
        // console.log(this.props);
        const { match } = this.props;

        return (
            <div>
                <p>Categoria: {match.params.categoria}</p>
                <p>Produto: {match.params.produto}</p>
            </div>
        );
    }
}

export default Produto;
