import React from 'react';

class NavMenu extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                    <a href="#">
                        Home
                    </a>
                    </li>

                    <li>
                    <a href="#">
                        Notificações
                    </a>
                    </li>

                    <li>
                    <a href="#">
                        Mensagens
                    </a>
                    </li>
                </ul>
                </nav>
        );
    }
}

export default NavMenu;