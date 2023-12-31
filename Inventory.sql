PGDMP                          {         	   Inventory    15.3    15.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394 	   Inventory    DATABASE     m   CREATE DATABASE "Inventory" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "Inventory";
                postgres    false            �            1259    16403    Orders    TABLE     �   CREATE TABLE public."Orders" (
    "Order_id" integer,
    "Customer_name" character varying,
    product_id integer NOT NULL,
    quantity integer,
    "Order_Date" date,
    "Order_Status" character varying,
    "Shipping_address" character varying
);
    DROP TABLE public."Orders";
       public         heap    postgres    false            �            1259    16410    Products    TABLE     �   CREATE TABLE public."Products" (
    product_id integer NOT NULL,
    "Name" character varying,
    "Category" character varying,
    "Sub Category" character varying,
    "Stock" integer,
    "Price" numeric
);
    DROP TABLE public."Products";
       public         heap    postgres    false            �            1259    16396    Sales    TABLE     �   CREATE TABLE public."Sales" (
    sale_id integer NOT NULL,
    product_id integer NOT NULL,
    sales_date date,
    quantity_sold integer,
    total numeric
);
    DROP TABLE public."Sales";
       public         heap    postgres    false            �            1259    16395    Sales_sale_id_seq    SEQUENCE     �   ALTER TABLE public."Sales" ALTER COLUMN sale_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Sales_sale_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215                      0    16403    Orders 
   TABLE DATA           �   COPY public."Orders" ("Order_id", "Customer_name", product_id, quantity, "Order_Date", "Order_Status", "Shipping_address") FROM stdin;
    public          postgres    false    216   O                 0    16410    Products 
   TABLE DATA           f   COPY public."Products" (product_id, "Name", "Category", "Sub Category", "Stock", "Price") FROM stdin;
    public          postgres    false    217   r                 0    16396    Sales 
   TABLE DATA           X   COPY public."Sales" (sale_id, product_id, sales_date, quantity_sold, total) FROM stdin;
    public          postgres    false    215   �                  0    0    Sales_sale_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Sales_sale_id_seq"', 9, true);
          public          postgres    false    214            z           2606    16409    Orders Orders_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (product_id);
 @   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_pkey";
       public            postgres    false    216            |           2606    16416    Products Products_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (product_id);
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            postgres    false    217            x           2606    16400    Sales Sales_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Sales"
    ADD CONSTRAINT "Sales_pkey" PRIMARY KEY (sale_id);
 >   ALTER TABLE ONLY public."Sales" DROP CONSTRAINT "Sales_pkey";
       public            postgres    false    215                 x�U��j�0E�㯘H���m	$$)-vi7�(xH�m)�J���*�m����>���x��@	&��.�L���(��)s!��j����z�z�E�Z�)���mFO�|��ʹ	ďf,�0�r�9�O���z���ɰ�Q4[x�]7A)�&s&Y���޽��i�`1RF.B�3>��nENd!D�rU��
�T����C�����lM&+�{�%��W=T1_)B�ck�	������-�X���pw�^��}<$I�׊�         D  x��TMo�0=S���!�����9.];`��� -6�:�#X��i�?*q�nX��K�D>J©	k<ԭ�:��ck�z���@l�@6��H�K �q�?:�M�ڄ~p|v*�t��`Q�5�[W�T
���f�p�uj����-�& ��#-�-i��Tn�P���h��ږõP&Iwac��_�=Uԛ[G�`�&�p�����w���!3�$
��WԽ3S�s"%f��y��,c�۸��B��MMM�?��R&��LH	�Дe��[l_,�fƙ�)��9������g3�gWp�C�4K6�_Y?������˦����bg�l+!3Hqm��'����E�ܡ~3�T�_M����F����L3.��S83������r ��0ǨF%dgl�Xo_��%w�[\��o^�PY����^Z�,�d��d�8J������!�٫0VW&xvC��eMo���ܖ��dz���; ��X�B�r��[�C�!2��5?!N��'E��>ح�`a����[�jH4w��/?~��s�fOE�6V�Y%j�슞e���!� Yڈ         k   x�E���0�f�DBHv��s�VU�C��p���A	���jDP냳�B���O�Q��'7���e"](���ut�MJv�U[�K�����\]Dn��     