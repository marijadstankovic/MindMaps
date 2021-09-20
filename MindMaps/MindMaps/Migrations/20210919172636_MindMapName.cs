using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MindMaps.Migrations
{
    public partial class MindMapName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Chats_ChatId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_User_UserId",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "MindMaps",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ChatId",
                table: "Messages",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfCreation", "Name" },
                values: new object[] { new DateTime(2021, 9, 19, 19, 26, 35, 886, DateTimeKind.Local).AddTicks(8677), "prva mm" });

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 9, 19, 19, 26, 35, 882, DateTimeKind.Local).AddTicks(9212));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 91, 209, 243, 230, 92, 41, 122, 227, 217, 103, 177, 137, 167, 237, 88, 28, 93, 198, 121, 112, 222, 42, 66, 88, 240, 34, 105, 227, 249, 79, 94, 67, 241, 52, 172, 107, 128, 124, 248, 86, 243, 113, 171, 12, 101, 181, 152, 67, 74, 9, 121, 252, 127, 106, 115, 144, 110, 212, 242, 153, 143, 246, 97, 11 }, new byte[] { 112, 229, 127, 212, 89, 241, 230, 124, 223, 120, 229, 228, 245, 225, 114, 193, 194, 90, 145, 42, 195, 189, 121, 14, 31, 65, 59, 200, 107, 184, 172, 2, 231, 173, 63, 254, 237, 231, 177, 244, 46, 156, 105, 150, 142, 220, 4, 147, 247, 64, 96, 172, 173, 93, 240, 205, 39, 48, 85, 200, 105, 232, 1, 117, 81, 84, 123, 223, 19, 61, 233, 231, 129, 17, 235, 29, 206, 163, 19, 200, 182, 67, 171, 56, 174, 3, 9, 61, 74, 89, 144, 68, 250, 219, 215, 110, 14, 2, 122, 213, 56, 156, 12, 194, 181, 163, 188, 181, 3, 168, 20, 247, 47, 215, 48, 22, 5, 244, 209, 75, 98, 200, 35, 7, 102, 48, 218, 197 } });

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Chats_ChatId",
                table: "Messages",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_User_UserId",
                table: "Messages",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Chats_ChatId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_User_UserId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "MindMaps");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Messages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ChatId",
                table: "Messages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

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

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Chats_ChatId",
                table: "Messages",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_User_UserId",
                table: "Messages",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
