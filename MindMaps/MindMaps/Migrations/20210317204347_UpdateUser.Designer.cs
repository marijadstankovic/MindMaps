﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MindMaps.Data.Context;

namespace MindMaps.Migrations
{
    [DbContext(typeof(MindMapsContext))]
    [Migration("20210317204347_UpdateUser")]
    partial class UpdateUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MindMaps.Data.Entities.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("Chats");

                    b.HasData(
                        new
                        {
                            Id = 1
                        });
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MindMapId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MindMapId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ChatId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.MindMap", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateOfCreation")
                        .HasColumnType("datetime2");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("MindMaps");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateOfCreation = new DateTime(2021, 3, 17, 21, 43, 46, 860, DateTimeKind.Local).AddTicks(7455)
                        });
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Node", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("MindMapID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<int>("XMLID")
                        .HasColumnType("int");

                    b.Property<string>("XMLText")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("MindMapID");

                    b.HasIndex("UserID");

                    b.ToTable("Nodes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            MindMapID = 1,
                            UserID = 1,
                            XMLID = 2,
                            XMLText = "<Rect label='Rectangle' href='' id='2'> < mxCell vertex = '1' parent = '1' >   < mxGeometry x = '120' y = '140' width = '80' height = '40' as= 'geometry' /></ mxCell ></ Rect > "
                        },
                        new
                        {
                            Id = 2,
                            MindMapID = 1,
                            UserID = 1,
                            XMLID = 3,
                            XMLText = " <Shape label='Shape' href='' id='3'> < mxCell style = 'ellipse' vertex = '1' parent = '1' >  < mxGeometry x = '340' y = '160' width = '60' height = '60' as= 'geometry' />  </ mxCell >    </ Shape > "
                        });
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ChatID")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfCreation")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("ChatID")
                        .IsUnique();

                    b.ToTable("Rooms");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ChatID = 1,
                            DateOfCreation = new DateTime(2021, 3, 17, 21, 43, 46, 857, DateTimeKind.Local).AddTicks(1807),
                            Name = "soba"
                        });
                });

            modelBuilder.Entity("MindMaps.Data.Entities.RoomUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("RoomID")
                        .HasColumnType("int");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomID");

                    b.HasIndex("UserID");

                    b.ToTable("RoomUsers");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("Id");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@admin",
                            LastName = "Adminovski",
                            Name = "Admin",
                            PasswordHash = new byte[] { 114, 194, 15, 180, 103, 156, 159, 32, 4, 80, 216, 208, 166, 30, 199, 43, 16, 55, 32, 128, 234, 65, 223, 83, 241, 149, 158, 225, 100, 186, 240, 158, 116, 128, 29, 156, 51, 15, 70, 123, 46, 86, 144, 33, 155, 211, 175, 139, 108, 169, 172, 199, 99, 127, 76, 240, 190, 225, 231, 17, 167, 95, 231, 99 },
                            PasswordSalt = new byte[] { 20, 134, 73, 249, 5, 81, 216, 148, 89, 134, 178, 218, 108, 193, 95, 21, 182, 43, 33, 47, 3, 226, 120, 82, 123, 49, 126, 238, 228, 25, 79, 78, 239, 98, 212, 182, 104, 186, 25, 151, 88, 181, 159, 19, 153, 115, 250, 63, 23, 174, 118, 156, 7, 26, 226, 150, 74, 115, 16, 17, 188, 143, 45, 101, 180, 255, 200, 124, 48, 197, 179, 174, 29, 218, 218, 146, 152, 198, 111, 147, 85, 73, 48, 56, 201, 0, 136, 153, 61, 41, 228, 71, 196, 117, 191, 175, 5, 193, 112, 121, 203, 52, 69, 110, 249, 188, 69, 178, 232, 179, 105, 232, 234, 45, 253, 245, 55, 22, 166, 43, 209, 206, 127, 164, 228, 248, 30, 17 }
                        });
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Comment", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.MindMap", "MindMap")
                        .WithMany()
                        .HasForeignKey("MindMapId");

                    b.HasOne("MindMaps.Data.Entities.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Message", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("ChatId");

                    b.HasOne("MindMaps.Data.Entities.User", "User")
                        .WithMany("Messages")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.MindMap", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.Room", "Room")
                        .WithMany("MindMaps")
                        .HasForeignKey("RoomId");
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Node", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.MindMap", "MindMap")
                        .WithMany()
                        .HasForeignKey("MindMapID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MindMaps.Data.Entities.User", "User")
                        .WithMany("Nodes")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MindMaps.Data.Entities.Room", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.Chat", "Chat")
                        .WithOne("Room")
                        .HasForeignKey("MindMaps.Data.Entities.Room", "ChatID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MindMaps.Data.Entities.RoomUser", b =>
                {
                    b.HasOne("MindMaps.Data.Entities.Room", "Room")
                        .WithMany("RoomUsers")
                        .HasForeignKey("RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MindMaps.Data.Entities.User", "User")
                        .WithMany("RoomUsers")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
