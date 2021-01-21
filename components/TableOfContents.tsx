import React from 'react'

type TOCProps = {
    html: string
}

type TOCState = {
    toc: JSX.Element[]
}

export class TableOfContents extends React.Component<TOCProps, TOCState> {

    componentDidMount()
    {
        if (process.browser) {
            let res: JSX.Element[] = [];
            
            let newDoc = document.createElement("template");
            newDoc.innerHTML = this.props.html;
            console.log(newDoc);
            console.log(newDoc);

            this.parse(0, newDoc.content.children, 1, res);

            this.setState({
                toc: res
            });
        }
    }

    parse(cIndex: number, content: HTMLCollection, currentIndentation: number, state: JSX.Element[]) : number
    {
        for (let index = cIndex; index < content.length; index++) {
            const element = content[index];

            const reg = /H(\d)/.exec(element.nodeName);
            if (reg != null) {
                console.log(element.nodeName, element.textContent);
                let s = reg[1];
                const indent = Number.parseInt(s);

                if(indent == currentIndentation)
                {
                    state.push(<li key={element.id} className={"h" + indent}><a href={"#" + element.id}>{element.textContent}</a></li>)
                }
                else if(indent > currentIndentation)
                {
                    let res: JSX.Element[] = [];
                    index = this.parse(index, content, currentIndentation + 1, res);
                    state.push(<ul>{res}</ul>);
                } else {
                    return index - 1;
                }
            }

        }
        return content.length;
    }

    render() {
        return <div id="tableofcontents-wrapper">
            <h1><a id="tableofcontents-toggle" href="#tableofcontents">Table of Contents</a></h1>
                <ul id="tableofcontents">{this.state?.toc ?? []}</ul>
            </div>
    }
}

export default TableOfContents
