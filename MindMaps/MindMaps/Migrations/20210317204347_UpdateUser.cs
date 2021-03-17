using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MindMaps.Migrations
{
    public partial class UpdateUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "User");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "User",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 17, 21, 43, 46, 860, DateTimeKind.Local).AddTicks(7455));

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "MindMaps",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 9, 21, 10, 22, 851, DateTimeKind.Local).AddTicks(8545));

            migrationBuilder.UpdateData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: 1,
                column: "DateOfCreation",
                value: new DateTime(2021, 3, 9, 21, 10, 22, 847, DateTimeKind.Local).AddTicks(6768));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "admin@admin");
        }
    }
}
