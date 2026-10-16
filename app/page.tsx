import { Sidebar } from "@/components/Sidebar";
import { posts, TAG_STYLES } from "@/lib/posts";

const INITIAL_AVATAR_STYLE = { background: "#A9D9E8", color: "#1F7A93" };

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F6ECDF" }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0, height: "100vh", overflowY: "auto" }}>
        <div
          style={{
            maxWidth: "760px",
            width: "100%",
            margin: "0 auto",
            padding: "34px 40px 80px",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                letterSpacing: ".8px",
                color: "#D9583C",
                marginBottom: "4px",
              }}
            >
              GUARDERÍA · SALA SOLES
            </div>
            <h1
              style={{
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "30px",
                margin: 0,
                color: "#3F362E",
              }}
            >
              Buenas, Caro
            </h1>
            <p style={{ margin: "5px 0 0", color: "#94887B", fontSize: "14.5px" }}>
              12 niños · martes 17 jun
            </p>
          </div>

          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "#FFFDF9",
              border: "1px solid #ECE0D0",
              borderRadius: "18px",
              padding: "14px 18px",
              marginBottom: "24px",
              boxShadow: "0 4px 14px -10px rgba(120,90,60,.4)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#F2937A",
                color: "#fff",
                fontFamily: "var(--font-fredoka)",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
              }}
            >
              C
            </div>
            <span style={{ flex: 1, color: "#A89A8B", fontSize: "15px" }}>
              Compartí un momento…
            </span>
            <span
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#FBE3D8",
                color: "#E0654A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </span>
          </a>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontSize: "12.5px",
                fontWeight: 800,
                letterSpacing: ".8px",
                color: "#8A7C6D",
              }}
            >
              PUBLICADO HOY
            </span>
            <span style={{ flex: 1, height: "1px", background: "#E7DAC8" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {posts.map((post) => {
              const tag = TAG_STYLES[post.type];
              const avatarStyle =
                post.type === "anuncio"
                  ? { background: tag.bg, color: tag.color }
                  : INITIAL_AVATAR_STYLE;
              return (
                <div
                  key={post.id}
                  style={{
                    background: "#FFFDF9",
                    border: "1px solid #ECE0D0",
                    borderRadius: "20px",
                    padding: "20px 22px",
                    boxShadow: "0 4px 16px -12px rgba(120,90,60,.5)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        ...avatarStyle,
                        fontFamily: "var(--font-fredoka)",
                        fontWeight: 600,
                        fontSize: "17px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: "none",
                      }}
                    >
                      {post.type === "anuncio" ? (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
                        </svg>
                      ) : (
                        post.authorInitial
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-fredoka)",
                          fontWeight: 600,
                          fontSize: "16.5px",
                          color: "#3F362E",
                        }}
                      >
                        {post.authorName}
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#A89A8B" }}>
                        {post.time} · publicado por vos
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        background: tag.bg,
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: tag.color,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          letterSpacing: ".5px",
                          color: tag.color,
                        }}
                      >
                        {post.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "#A89A8B",
                      marginBottom: "10px",
                    }}
                  >
                    Para: {post.audience}
                  </div>
                  <p
                    style={{
                      fontSize: "15.5px",
                      lineHeight: 1.55,
                      color: "#4A4038",
                      margin: 0,
                    }}
                  >
                    {post.body}
                  </p>
                  {post.hasPhoto && (
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        marginTop: "14px",
                        border: "1.5px dashed #DBCDBA",
                        borderRadius: "16px",
                        background: "#F4ECE1",
                        height: "200px",
                        color: "#B0A290",
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
                      </svg>
                      <span style={{ fontSize: "13.5px" }}>{post.photoLabel}</span>
                    </a>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "18px",
                      marginTop: "16px",
                      paddingTop: "14px",
                      borderTop: "1px solid #F0E6D8",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "#E0654A",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="#E0654A"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                      {post.reactions}
                    </span>
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "#94887B",
                        fontWeight: 700,
                        fontSize: "14px",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
                      </svg>
                      {post.comments}
                    </a>
                    <span style={{ flex: 1 }} />
                    <a
                      href="#"
                      style={{ color: "#C5503A", fontWeight: 800, fontSize: "14px" }}
                    >
                      Editar
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
