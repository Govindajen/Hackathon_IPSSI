export default function Layout ({ children }) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <Footer />
    </>
  )
}