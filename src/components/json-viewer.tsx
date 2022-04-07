import * as React from 'react';

type Props = {
  data: string;
}

export default function JsonViewer(props: Props) {

  const data = JSON.parse(props.data);
  return <code className="hljs">{renderJsonValue(data)}</code>;

}

type JsonValue = null | string | boolean | number | any[] | Record<string, any>;


function renderJsonValue(value: JsonValue, asLink?: boolean): React.ReactNode {

  if (value===null) {
    return <span className="hljs-keyword">null</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="hljs-keyword">{value?'true':'false'}</span>;
  }
  if (typeof value === 'string') {
    if (asLink && isLegalLink(value)) {
      return <span className="hljs-string"><a href={value}>"{value}"</a></span>;
    } else {
      return <span className="hljs-string">"{value}"</span>;
    }
  }
  if (typeof value === 'number') {
    return <span className="hljs-number">{value}</span>;
  }
  if (Array.isArray(value)) {
    return <>
      <span className="hljs-punctuation">[</span><ul>
        {(value.map((item, idx) => {
          return <li>{renderJsonValue(item)}{idx < value.length -1 ? <span className="hljs-punctuation">,</span>:null}</li>;
        }))}
      </ul><span className="hljs-punctuation">]</span>
    </>;
  }

  return renderJsonObject(value);

}

function renderJsonObject(value: Record<string, JsonValue>) {

  return <>
    <span className="hljs-punctuation">{'{'}</span><br />
    <ul>
      {(Object.entries(value).map(([key, value], idx, arr) => {
        return <li>
          <span className="hidden-copy-paste">"</span>
          <span className="hljs-attr">{key}</span>
          <span className="hidden-copy-paste">"</span>
          <span className="hljs-punctuation">: </span>
          {renderJsonValue(value, isLikelyAUri(key))}
          {idx < arr.length -1 ? <span className="hljs-punctuation">,</span>:null}
        </li>;
      }))}
    </ul>
    <span className="hljs-punctuation">{'}'}</span>
  </>;

}


/**
 * Checks at a name of a property and returns true if it's probably a uri
 */
function isLikelyAUri(keyName: string) {

  const key = keyName.toLowerCase();
  return key.endsWith('href') || key.endsWith('uri') || key.endsWith('url');

}

const allowedSchemes = ['http', 'https', 'mailto', 'gopher'];
function isLegalLink(uri: string): boolean {

  if (uri.includes('{')) {
    // Likely a templated URI
    return false;
  }
  if (uri.startsWith('/')) {
    return true;
  }
  for(const scheme of allowedSchemes) {
    if (uri.startsWith(scheme + ':')) {
      return true;
    }
  }
  return false;

}
