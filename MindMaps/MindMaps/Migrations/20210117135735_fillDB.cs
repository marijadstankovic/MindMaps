using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MindMaps.Migrations
{
    public partial class fillDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Chats",
                column: "Id",
                value: 1);

            migrationBuilder.InsertData(
                table: "MindMaps",
                columns: new[] { "Id", "DateOfCreation", "RoomId" },
                values: new object[] { 1, new DateTime(2021, 1, 17, 14, 57, 35, 143, DateTimeKind.Local).AddTicks(4850), null });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Email", "LastName", "Name", "Password" },
                values: new object[] { 1, "admin@admin", "Adminovski", "Admin", "admin@admin" });

            migrationBuilder.InsertData(
                table: "Nodes",
                columns: new[] { "Id", "MindMapID", "UserID", "XMLID", "XMLText" },
                values: new object[] { 1, 1, 1, 2, "<Rect label='Rectangle' href='' id='2'> < mxCell vertex = '1' parent = '1' >   < mxGeometry x = '120' y = '140' width = '80' height = '40' as= 'geometry' /></ mxCell ></ Rect > " });

            migrationBuilder.InsertData(
                table: "Nodes",
                columns: new[] { "Id", "MindMapID", "UserID", "XMLID", "XMLText" },
                values: new object[] { 2, 1, 1, 3, " <Shape label='Shape' href='' id='3'> < mxCell style = 'ellipse' vertex = '1' parent = '1' >  < mxGeometry x = '340' y = '160' width = '60' height = '60' as= 'geometry' />  </ mxCell >    </ Shape > " });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "ChatID", "DateOfCreation", "Name" },
                values: new object[] { 1, 1, new DateTime(2021, 1, 17, 14, 57, 35, 137, DateTimeKind.Local).AddTicks(9218), "soba" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Nodes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Nodes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Chats",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
