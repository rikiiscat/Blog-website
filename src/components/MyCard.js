import React from 'react'

export default function MyCard(props) {
    return (
        <div className="ui card">
            <div className="contect">
                {props.children}
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">DisApprove</div>
                </div>
            </div>
        </div>
    )
}