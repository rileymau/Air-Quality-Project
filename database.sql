--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: searches; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.searches (
    search_id integer NOT NULL,
    user_id integer,
    date date,
    zipcode integer,
    reporting_area character varying(50),
    ozone integer,
    pm integer,
    category integer
);


ALTER TABLE public.searches OWNER TO hackbright;

--
-- Name: searches_search_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.searches_search_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.searches_search_id_seq OWNER TO hackbright;

--
-- Name: searches_search_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.searches_search_id_seq OWNED BY public.searches.search_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(25) NOT NULL
);


ALTER TABLE public.users OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: searches search_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.searches ALTER COLUMN search_id SET DEFAULT nextval('public.searches_search_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: searches; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.searches (search_id, user_id, date, zipcode, reporting_area, ozone, pm, category) FROM stdin;
1	3	2021-11-15	55119	Minneapolis-St. Paul	\N	25	1
2	2	2021-11-15	55119	Minneapolis-St. Paul	\N	25	1
3	2	2021-11-15	55119	Minneapolis-St. Paul	\N	25	1
4	2	2021-11-15	55427	Minneapolis-St. Paul	\N	27	1
5	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
6	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
7	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
8	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
9	3	2021-11-15	55102	Minneapolis-St. Paul	\N	27	1
10	3	2021-11-15	55427	Minneapolis-St. Paul	\N	27	1
11	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
12	3	2021-11-15	90210	NW Coastal LA	\N	30	1
13	3	2021-11-15	90211	NW Coastal LA	\N	30	1
14	3	2021-11-15	90212	NW Coastal LA	\N	30	1
15	3	2021-11-15	90213	NW Coastal LA	\N	30	1
16	3	2021-11-15	90230	NW Coastal LA	\N	30	1
17	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
18	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
19	3	2021-11-15	55112	Minneapolis-St. Paul	\N	27	1
20	3	2021-11-15	55119	Minneapolis-St. Paul	\N	27	1
21	3	2021-11-15	12457	Lower Hudson Valley Region	\N	18	1
22	3	2021-11-15	12457	Lower Hudson Valley Region	\N	18	1
23	3	2021-11-15	12457	Lower Hudson Valley Region	\N	18	1
24	3	2021-11-15	55112	Minneapolis-St. Paul	\N	28	1
25	3	2021-11-15	55112	Minneapolis-St. Paul	\N	28	1
26	3	2021-11-15	55101	Minneapolis-St. Paul	\N	28	1
27	2	2021-11-15	55112	Minneapolis-St. Paul	\N	28	1
28	2	2021-11-16	55112	Minneapolis-St. Paul	\N	38	1
29	1	2021-11-16	55119	Minneapolis-St. Paul	\N	48	1
30	1	2021-11-16	55119	Minneapolis-St. Paul	\N	48	1
31	1	2021-11-16	55120	Minneapolis-St. Paul	\N	48	1
32	1	2021-11-16	55120	Minneapolis-St. Paul	\N	48	1
33	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
34	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
35	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
36	1	2021-11-16	55102	Minneapolis-St. Paul	\N	48	1
37	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
38	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
39	1	2021-11-16	55112	Minneapolis-St. Paul	\N	48	1
40	1	2021-11-16	55119	Minneapolis-St. Paul	\N	48	1
41	1	2021-11-16	55119	Minneapolis-St. Paul	\N	51	2
42	1	2021-11-16	55112	Minneapolis-St. Paul	\N	51	2
43	1	2021-11-16	55112	Minneapolis-St. Paul	\N	51	2
44	1	2021-11-16	55112	Minneapolis-St. Paul	\N	51	2
45	1	2021-11-16	55119	Minneapolis-St. Paul	\N	51	2
46	3	2021-11-16	55123	Minneapolis-St. Paul	\N	51	2
47	1	2021-11-16	55119	Minneapolis-St. Paul	\N	48	1
48	1	2021-11-16	55120	Minneapolis-St. Paul	\N	48	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.users (user_id, email, password) FROM stdin;
1	me@gmail.com	123
2	hello@comcast.net	123
3	hi@gmail.com	123
\.


--
-- Name: searches_search_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.searches_search_id_seq', 48, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.users_user_id_seq', 3, true);


--
-- Name: searches searches_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT searches_pkey PRIMARY KEY (search_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: searches searches_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT searches_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

