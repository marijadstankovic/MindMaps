using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MindMaps.Migrations
{
    public partial class updateMindmapTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Nodes");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_ChatID",
                table: "Rooms");

            migrationBuilder.AddColumn<string>(
                name: "XMLText",
                table: "MindMaps",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 8, 22, 13, 57, 34, 446, DateTimeKind.Local).AddTicks(6572));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 8, 22, 13, 57, 34, 442, DateTimeKind.Local).AddTicks(7644));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 110, 242, 95, 246, 53, 222, 223, 77, 116, 255, 51, 98, 203, 194, 35, 125, 122, 75, 124, 140, 163, 106, 43, 15, 120, 177, 2, 241, 51, 143, 166, 254, 216, 222, 66, 105, 195, 9, 200, 252, 90, 199, 32, 112, 37, 32, 69, 92, 68, 59, 46, 151, 158, 167, 1, 233, 69, 134, 229, 142, 214, 208, 42, 51 }, new byte[] { 1, 229, 116, 148, 13, 35, 253, 161, 18, 171, 222, 41, 233, 186, 0, 23, 221, 103, 40, 108, 28, 175, 82, 99, 249, 95, 125, 82, 5, 215, 224, 82, 118, 66, 64, 30, 1, 139, 192, 3, 196, 144, 224, 23, 159, 171, 195, 138, 165, 99, 125, 6, 33, 88, 119, 191, 218, 14, 169, 57, 249, 115, 31, 173, 6, 200, 12, 184, 218, 186, 89, 112, 91, 28, 175, 43, 230, 30, 28, 125, 176, 52, 126, 238, 176, 170, 146, 40, 66, 139, 118, 185, 209, 77, 60, 86, 22, 161, 137, 37, 109, 20, 35, 244, 87, 211, 5, 113, 116, 105, 129, 49, 131, 181, 77, 172, 211, 209, 226, 213, 182, 119, 107, 98, 56, 128, 205, 119 } });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ChatID",
                table: "Rooms",
                column: "ChatID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Rooms_ChatID",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "XMLText",
                table: "MindMaps");

            migrationBuilder.CreateTable(
                name: "Nodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MindMapID = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    XMLID = table.Column<int>(type: "int", nullable: false),
                    XMLText = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nodes_MindMaps_MindMapID",
                        column: x => x.MindMapID,
                        principalTable: "MindMaps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Nodes_User_UserID",
                        column: x => x.UserID,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 17, 21, 43, 46, 860, DateTimeKind.Local).AddTicks(7455));

            migrationBuilder.InsertData(
                table: "Nodes",
                columns: new[] { "Id", "MindMapID", "UserID", "XMLID", "XMLText" },
                values: new object[,]
                {
                    { 1, 1, 1, 2, "<Rect label='Rectangle' href='' id='2'> < mxCell vertex = '1' parent = '1' >   < mxGeometry x = '120' y = '140' width = '80' height = '40' as= 'geometry' /></ mxCell ></ Rect > " },
                    { 2, 1, 1, 3, " <Shape label='Shape' href='' id='3'> < mxCell style = 'ellipse' vertex = '1' parent = '1' >  < mxGeometry x = '340' y = '160' width = '60' height = '60' as= 'geometry' />  </ mxCell >    </ Shape > " }
                });

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 17, 21, 43, 46, 857, DateTimeKind.Local).AddTicks(1807));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 114, 194, 15, 180, 103, 156, 159, 32, 4, 80, 216, 208, 166, 30, 199, 43, 16, 55, 32, 128, 234, 65, 223, 83, 241, 149, 158, 225, 100, 186, 240, 158, 116, 128, 29, 156, 51, 15, 70, 123, 46, 86, 144, 33, 155, 211, 175, 139, 108, 169, 172, 199, 99, 127, 76, 240, 190, 225, 231, 17, 167, 95, 231, 99 }, new byte[] { 20, 134, 73, 249, 5, 81, 216, 148, 89, 134, 178, 218, 108, 193, 95, 21, 182, 43, 33, 47, 3, 226, 120, 82, 123, 49, 126, 238, 228, 25, 79, 78, 239, 98, 212, 182, 104, 186, 25, 151, 88, 181, 159, 19, 153, 115, 250, 63, 23, 174, 118, 156, 7, 26, 226, 150, 74, 115, 16, 17, 188, 143, 45, 101, 180, 255, 200, 124, 48, 197, 179, 174, 29, 218, 218, 146, 152, 198, 111, 147, 85, 73, 48, 56, 201, 0, 136, 153, 61, 41, 228, 71, 196, 117, 191, 175, 5, 193, 112, 121, 203, 52, 69, 110, 249, 188, 69, 178, 232, 179, 105, 232, 234, 45, 253, 245, 55, 22, 166, 43, 209, 206, 127, 164, 228, 248, 30, 17 } });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_ChatID",
                table: "Rooms",
                column: "ChatID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_MindMapID",
                table: "Nodes",
                column: "MindMapID");

            migrationBuilder.CreateIndex(
                name: "IX_Nodes_UserID",
                table: "Nodes",
                column: "UserID");
        }
    }
}
