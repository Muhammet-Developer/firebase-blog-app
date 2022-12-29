import ContentLoader from "react-content-loader"

const CardLoader = props  => {
  return (
    <ContentLoader viewBox="5 -20 400 425" height={475} width={490} {...props} >
    <circle cx="30" cy="310" r="25" />
    <rect x="10" y="233" rx="4" ry="4" width="330" height="13" />
    <rect x="10" y="260" rx="4" ry="4" width="50" height="8" />
    <rect x="70" y="295" rx="4" ry="4" width="50" height="8" />
    <rect x="70" y="315" rx="4" ry="4" width="90" height="8" />
    <rect x="320" y="260" rx="4" ry="4" width="20" height="20" />
    <rect x="0" y="210" rx="5" ry="5" width="100" height="10" />
    <rect x="0" y="0" rx="5" ry="5" width="340" height="200" />
  </ContentLoader>
  )
}

export default CardLoader