import * as React from 'react';

type Props = {
  data: string;
}

export default function JsonViewer(props: Props) {

  const data = JSON.parse(props.data);
  return <code className="hljs"><pre>{jsonValueRender(data)}</pre></code>;

}

type JsonValue = null | string | boolean | number | any[] | Record<string, any>;


function jsonValueRender(value: JsonValue, ident = ''): React.ReactNode {

  if (value===null) {
    return <span className="hljs-keyword">null</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="hljs-keyword">{value?'true':'false'}</span>;
  }
  if (typeof value === 'string') {
    return <span className="hljs-string">"{value}"</span>;
  }
  if (typeof value === 'number') {
    return <span className="hljs-number">{value}</span>;
  }
  if (Array.isArray(value)) {
    return <>
      <span className="hljs-punctuation">[</span>{'\n'}
      {(value.map((item, idx) => {
        return <>{ident + '  '}{jsonValueRender(item, ident + '  ')}{idx < value.length -1 ? <span className="hljs-punctuation">,</span>:null}{'\n'}</>;
      }))}
      {ident}<span className="hljs-punctuation">]</span>
    </>;
  }

  // Render object
  return <>
    <span className="hljs-punctuation">{'{'}</span>{'\n'}
    {(Object.entries(value).map(([key, value], idx, arr) => {
      return <>{ident + '  '}<span className="hljs-attr">{key}</span><span className="hljs-punctuation">:</span> {jsonValueRender(value, ident + '  ')}{idx < arr.length -1 ? <span className="hljs-punctuation">,</span>:null}{'\n'}</>;
    }))}
    {ident}<span className="hljs-punctuation">{'}'}</span>
  </>;

}
