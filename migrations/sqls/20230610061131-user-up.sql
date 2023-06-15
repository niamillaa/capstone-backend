CREATE TABLE public."user"(
    id              UUID         NOT NULL DEFAULT gen_random_uuid(),
    username        VARCHAR      NOT NULL,
    email           VARCHAR      NOT NULL,
    password        VARCHAR      NOT NULL,
    phone_number    VARCHAR      NOT NULL,
    name            VARCHAR      NOT NULL,
    berat_badan     REAL,
    tinggi_badan    REAL,
    jenis_kelamin   BOOLEAN
)